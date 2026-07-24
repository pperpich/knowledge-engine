import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const entriesRoot = path.join(root, "entries");
const referencesRoot = path.join(root, "references");
const catalogRoot = path.join(root, "catalog");

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

function parseMetadata(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`Missing front matter: ${filePath}`);

  try {
    return JSON.parse(match[1]);
  } catch (error) {
    throw new Error(`Front matter must be valid JSON in ${filePath}: ${error.message}`);
  }
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function loadRecords(directory) {
  const files = (await walk(directory)).sort();
  const records = [];

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf8");
    const metadata = parseMetadata(content, filePath);
    records.push({
      ...metadata,
      path: path.relative(root, filePath).split(path.sep).join("/")
    });
  }

  return records.sort((a, b) => a.id.localeCompare(b.id));
}

function jsonl(records) {
  return records.map((record) => JSON.stringify(record)).join("\n") + (records.length ? "\n" : "");
}

const entries = await loadRecords(entriesRoot);
const references = await loadRecords(referencesRoot);
const edges = [];

for (const entry of entries) {
  for (const topic of entry.topics ?? []) {
    edges.push({ from: entry.id, type: "has_topic", to: `topic:${topic}` });
  }
  for (const entity of entry.entities ?? []) {
    edges.push({ from: entry.id, type: "mentions", to: `entity:${slug(entity)}`, label: entity });
  }
  for (const reference of entry.references ?? []) {
    edges.push({ from: entry.id, type: "cites", to: reference });
  }
  for (const related of entry.related ?? []) {
    edges.push({ from: entry.id, type: "related_to", to: related });
  }
  if (entry.experiment) {
    edges.push({ from: entry.id, type: "proposes", to: entry.experiment });
  }
}

for (const reference of references) {
  for (const topic of reference.topics ?? []) {
    edges.push({ from: reference.id, type: "has_topic", to: `topic:${topic}` });
  }
  for (const related of reference.related ?? []) {
    edges.push({ from: reference.id, type: "related_to", to: related });
  }
}

edges.sort((a, b) =>
  a.from.localeCompare(b.from) ||
  a.type.localeCompare(b.type) ||
  a.to.localeCompare(b.to)
);

await fs.mkdir(catalogRoot, { recursive: true });
await fs.writeFile(path.join(catalogRoot, "entries.jsonl"), jsonl(entries));
await fs.writeFile(path.join(catalogRoot, "references.jsonl"), jsonl(references));
await fs.writeFile(path.join(catalogRoot, "edges.jsonl"), jsonl(edges));

console.log(`Indexed ${entries.length} entries, ${references.length} references, and ${edges.length} edges.`);
