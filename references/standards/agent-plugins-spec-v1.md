---
{
  "schema_version": 1,
  "id": "reference:agent-plugins:spec-v1",
  "title": "Agent Plugins Specification v1.0.0",
  "kind": "standard",
  "publisher": "Agent Plugins",
  "canonical_url": "https://agent-plugins.org/specification",
  "published_at": null,
  "accessed_at": "2026-09-11",
  "authors": [],
  "topics": ["agent-tooling", "mcp"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"version": "1.0.0"},
  "related": ["reference:google-cloud:developer-plugin-ai-coding-agents"]
}
---

# Agent Plugins Specification v1.0.0

## Annotation

Canonical specification page for the Agent Plugins portable package format. The current document identifies itself as a Working Draft, so this record should not be read as evidence of a finalized standard or universal client conformance.

## Relevant evidence

The specification defines a plugin manifest in `plugin.json`, Agent Skills under `skills/`, and MCP server configuration in `mcp.json`. Version 1 focuses on skills and MCP packaging. The specification describes packaging and discovery rather than a sandbox boundary; plugin subprocess execution must still be constrained by the consuming client or runtime.
