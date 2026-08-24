---
{
  "schema_version": 1,
  "id": "reference:openai:agents-python-v0.20.0",
  "title": "OpenAI Agents SDK for Python v0.20.0",
  "kind": "repository",
  "publisher": "OpenAI",
  "canonical_url": "https://github.com/openai/openai-agents-python/releases/tag/v0.20.0",
  "published_at": "2026-08-11",
  "accessed_at": "2026-08-14",
  "authors": ["OpenAI Agents SDK maintainers"],
  "topics": ["agent-tooling", "developer-tools", "mcp", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "openai/openai-agents-python", "version": "v0.20.0"},
  "related": []
}
---

# OpenAI Agents SDK for Python v0.20.0

## Annotation

Official release record for the August 11 Python Agents SDK update, including the new implicit model default, MCP SDK migration behavior, resumable pending input, and sandbox credential-boundary changes.

## Relevant evidence

Version 0.20.0 changes the implicit default model to `gpt-5.6-luna`, supports MCP Python SDK v1 and v2 for local stdio, SSE, and Streamable HTTP connections, adds durable pending input to `RunState`, and requires explicit acknowledgement for credential-bearing sandbox mount exposure. The release notes warn that customized MCP HTTP transports may need migration or an `mcp<2` pin.
