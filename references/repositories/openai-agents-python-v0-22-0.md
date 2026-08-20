---
{
  "schema_version": 1,
  "id": "reference:openai:agents-python-v0.22.0",
  "title": "OpenAI Agents SDK for Python v0.22.0",
  "kind": "repository",
  "publisher": "OpenAI",
  "canonical_url": "https://github.com/openai/openai-agents-python/releases/tag/v0.22.0",
  "published_at": "2026-08-19",
  "accessed_at": "2026-08-20",
  "authors": ["OpenAI Agents SDK maintainers"],
  "topics": ["agent-tooling", "developer-tools", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "openai/openai-agents-python", "version": "v0.22.0"},
  "related": []
}
---

# OpenAI Agents SDK for Python v0.22.0

## Annotation

Official release record for the August 19 Python Agents SDK update.

## Relevant evidence

The release train adds model-call timeout controls, run-scoped sandbox working directories, Docker sandbox networking disablement, and hosted Modal sandbox resource options. These controls make liveness, filesystem isolation, egress, and resource limits more explicit in the agent runtime; they do not by themselves provide application-level exactly-once execution or complete sandbox security.
