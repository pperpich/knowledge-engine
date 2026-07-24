import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

async function walk(directory) {
  let items;
  try {
    items = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  const files = [];
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) files.push(...await walk(fullPath));
    else if (item.isFile() && item.name.endsWith(".md") && item.name !== "README.md") files.push(fullPath);
  }
  return files;
}

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function parseMetadata(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    errors.push(`${relative(filePath)}: missing JSON front matter`);
    return null;
  }

  try {
    return JSON.parse(match[1]);
  } catch (error) {
    errors.push(`${relative(filePath)}: invalid JSON front matter: ${error.message}`);
    return null;
  }
}

function matchesType(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  return typeof value === type;
}

function validateValue(value, schema, location) {
  if (Object.hasOwn(schema, "const") && value !== schema.const) {
    errors.push(`${location}: must equal ${JSON.stringify(schema.const)}`);
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${location}: must be one of ${schema.enum.join(", ")}`);
  }

  if (schema.type) {
    const allowed = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!allowed.some((type) => matchesType(value, type))) {
      errors.push(`${location}: expected ${allowed.join(" or ")}`);
      return;
    }
  }

  if (value === null) return;

  if (typeof value === "string") {
    if (schema.minLength && value.length < schema.minLength) {
      errors.push(`${location}: must not be empty`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${location}: does not match ${schema.pattern}`);
    }
    if (schema.format === "date") {
      const validDate = /^\d{4}-\d{2}-\d{2}$/.test(value) &&
        !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
        new Date(`${value}T00:00:00Z`).toISOString().startsWith(value);
      if (!validDate) errors.push(`${location}: must be a valid YYYY-MM-DD date`);
    }
    if (schema.format === "uri") {
      try {
        new URL(value);
      } catch {
        errors.push(`${location}: must be an absolute URI`);
      }
    }
  }

  if (Array.isArray(value)) {
    if (schema.uniqueItems) {
      const serialized = value.map((item) => JSON.stringify(item));
      if (new Set(serialized).size !== serialized.length) {
        errors.push(`${location}: contains duplicate items`);
      }
    }
    if (schema.items) {
      value.forEach((item, index) => validateValue(item, schema.items, `${location}[${index}]`));
    }
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const properties = schema.properties ?? {};
    for (const required of schema.required ?? []) {
      if (!Object.hasOwn(value, required)) errors.push(`${location}: missing required field ${required}`);
    }

    for (const [key, child] of Object.entries(value)) {
      if (properties[key]) {
        validateValue(child, properties[key], `${location}.${key}`);
      } else if (schema.additionalProperties === false) {
        errors.push(`${location}: unknown field ${key}`);
      } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
        validateValue(child, schema.additionalProperties, `${location}.${key}`);
      }
    }
  }
}

async function loadSchema(name) {
  return JSON.parse(await fs.readFile(path.join(root, "schema", name), "utf8"));
}

async function loadRecords(directory, schemaForPath) {
  const records = [];
  for (const filePath of (await walk(directory)).sort()) {
    const metadata = parseMetadata(await fs.readFile(filePath, "utf8"), filePath);
    if (!metadata) continue;

    const recordPath = relative(filePath);
    const schema = schemaForPath(recordPath);
    validateValue(metadata, schema, recordPath);
    records.push({ ...metadata, path: recordPath });
  }
  return records;
}

const entrySchema = await loadSchema("entry.schema.json");
const experimentSchema = await loadSchema("experiment.schema.json");
const referenceSchema = await loadSchema("reference.schema.json");

const entries = await loadRecords(path.join(root, "entries"), (recordPath) =>
  recordPath.startsWith("entries/experiments/") ? experimentSchema : entrySchema
);
const references = await loadRecords(path.join(root, "references"), () => referenceSchema);
const allRecords = [...entries, ...references];

const ids = new Map();
for (const record of allRecords) {
  if (!record.id) continue;
  if (ids.has(record.id)) errors.push(`${record.path}: duplicate ID also used by ${ids.get(record.id).path}`);
  else ids.set(record.id, record);
}

const taxonomyText = await fs.readFile(path.join(root, "taxonomy", "topics.yml"), "utf8");
const allowedTopics = new Set(
  taxonomyText.split(/\r?\n/)
    .map((line) => line.match(/^\s{2}-\s+([a-z0-9-]+)\s*$/)?.[1])
    .filter(Boolean)
);

for (const record of allRecords) {
  for (const topic of record.topics ?? []) {
    if (!allowedTopics.has(topic)) errors.push(`${record.path}: unknown taxonomy topic ${topic}`);
  }
}

const canonicalUrls = new Map();
const identifiers = new Map();

function normalizedUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

for (const reference of references) {
  if (reference.canonical_url) {
    const canonical = normalizedUrl(reference.canonical_url);
    if (canonicalUrls.has(canonical)) {
      errors.push(`${reference.path}: duplicate canonical URL also used by ${canonicalUrls.get(canonical).path}`);
    } else {
      canonicalUrls.set(canonical, reference);
    }
  }

  for (const [kind, value] of Object.entries(reference.identifiers ?? {})) {
    const key = `${kind.toLowerCase()}:${value.trim().toLowerCase()}`;
    if (identifiers.has(key)) {
      errors.push(`${reference.path}: duplicate identifier ${key} also used by ${identifiers.get(key).path}`);
    } else {
      identifiers.set(key, reference);
    }
  }
}

for (const entry of entries) {
  for (const referenceId of entry.references ?? []) {
    const target = ids.get(referenceId);
    if (!target || target.kind === "experiment" || !target.canonical_url) {
      errors.push(`${entry.path}: dangling reference ${referenceId}`);
    }
  }

  for (const relatedId of entry.related ?? []) {
    if (!ids.has(relatedId)) errors.push(`${entry.path}: dangling related ID ${relatedId}`);
  }

  if (entry.experiment) {
    const target = ids.get(entry.experiment);
    if (!target || target.kind !== "experiment") {
      errors.push(`${entry.path}: dangling experiment ${entry.experiment}`);
    }
  }

  if (entry.kind === "daily-brief") {
    const [year, month] = entry.date?.split("-") ?? [];
    const prefix = `entries/briefs/${entry.namespace}/${year}/${month}/${entry.date}--`;
    const slug = entry.path.slice(prefix.length, -3);
    if (!entry.path.startsWith(prefix) || !entry.path.endsWith(".md") || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      errors.push(`${entry.path}: daily brief path must be ${prefix}<slug>.md`);
    }
  }

  if (entry.kind === "experiment") {
    const directory = `entries/experiments/${entry.status}/`;
    const prefix = `${directory}exp-${entry.date}--`;
    const slug = entry.path.slice(prefix.length, -3);
    if (!entry.path.startsWith(prefix) || !entry.path.endsWith(".md") || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      errors.push(`${entry.path}: experiment path must be ${prefix}<slug>.md`);
    }
  }
}

const referenceDirectories = {
  paper: "papers",
  documentation: "documentation",
  repository: "repositories",
  standard: "standards",
  web: "web"
};

for (const reference of references) {
  for (const relatedId of reference.related ?? []) {
    if (!ids.has(relatedId)) errors.push(`${reference.path}: dangling related ID ${relatedId}`);
  }

  const directory = referenceDirectories[reference.kind];
  const prefix = `references/${directory}/`;
  const slug = reference.path.slice(prefix.length, -3);
  if (!directory || !reference.path.startsWith(prefix) || !reference.path.endsWith(".md") ||
      !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    errors.push(`${reference.path}: reference path must be ${prefix}<slug>.md`);
  }
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${entries.length} entries and ${references.length} references.`);
}
