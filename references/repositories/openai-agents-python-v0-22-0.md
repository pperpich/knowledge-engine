---
{
  "schema_version": 1,
  "id": "reference:openai:agents-python-v0.22.0",
  "title": "OpenAI Agents SDK for Python release history",
  "kind": "repository",
  "publisher": "OpenAI",
  "canonical_url": "https://github.com/openai/openai-agents-python/releases",
  "published_at": null,
  "accessed_at": "2026-09-08",
  "authors": ["OpenAI Agents SDK maintainers"],
  "topics": ["agent-tooling", "mcp", "developer-tools", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "openai/openai-agents-python"},
  "related": []
}
---

# OpenAI Agents SDK for Python release history

## Annotation

Official maintainer release history for the OpenAI Agents SDK for Python. The stable reference ID is retained from the existing repository record while the mutable record now represents the repository release stream rather than a single tag.

## Relevant evidence

Release v0.22.1 (September 8, 2026) adds server-wide MCP tool guardrails, configurable Unix-local environment isolation, and fail-closed handling for empty tool arguments. It also hardens resumed sessions around failed writes, persisted guardrail results, handoff append failures, concurrent compaction writes, and terminal outputs that were accepted but not persisted.
