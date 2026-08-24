---
{
  "schema_version": 1,
  "id": "reference:openai:agents-js-v0.15.0",
  "title": "OpenAI Agents SDK for JavaScript v0.15.0",
  "kind": "repository",
  "publisher": "OpenAI",
  "canonical_url": "https://github.com/openai/openai-agents-js/releases/tag/v0.15.0",
  "published_at": "2026-08-11",
  "accessed_at": "2026-08-14",
  "authors": ["OpenAI Agents SDK maintainers"],
  "topics": ["agent-tooling", "developer-tools", "mcp", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "openai/openai-agents-js", "version": "v0.15.0"},
  "related": []
}
---

# OpenAI Agents SDK for JavaScript v0.15.0

## Annotation

Official release record for the coordinated August 11 JavaScript Agents SDK update.

## Relevant evidence

Version 0.15.0 changes the implicit default model to `gpt-5.6-luna`, uses the MCP TypeScript SDK v2 client while negotiating the 2026-07-28 protocol with legacy-server fallback, adds durable `RunState.pendingInput`, preserves structured tool output across serialization, and makes credential-bearing sandbox mounts fail closed unless their effective exposure is explicitly acknowledged. Applications supplying their own OpenAI client require `openai` 7.2 or later.
