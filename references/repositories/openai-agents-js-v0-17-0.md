---
{
  "schema_version": 1,
  "id": "reference:openai:agents-js-v0.17.0",
  "title": "OpenAI Agents SDK for JavaScript v0.17.0",
  "kind": "repository",
  "publisher": "OpenAI",
  "canonical_url": "https://github.com/openai/openai-agents-js/releases/tag/v0.17.0",
  "published_at": "2026-08-19",
  "accessed_at": "2026-08-20",
  "authors": ["OpenAI Agents SDK maintainers"],
  "topics": ["agent-tooling", "developer-tools", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "openai/openai-agents-js", "version": "v0.17.0"},
  "related": []
}
---

# OpenAI Agents SDK for JavaScript v0.17.0

## Annotation

Official release record for the August 19 JavaScript Agents SDK update.

## Relevant evidence

The release train adds model-call timeout controls, run-scoped sandbox working directories, Docker sandbox networking disablement, and hosted Modal sandbox resource options. The parallel Python and JavaScript changes make these runtime boundaries portable across the two SDKs while leaving application-specific retry, idempotency, and security policy to the builder.
