---
{
  "schema_version": 1,
  "id": "reference:nvidia:nemoclaw-v0.0.121",
  "title": "NemoClaw v0.0.121 release notes",
  "kind": "documentation",
  "publisher": "NVIDIA",
  "canonical_url": "https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/8",
  "published_at": "2026-09-08",
  "accessed_at": "2026-09-09",
  "authors": [],
  "topics": ["agent-tooling", "mcp", "safety-and-security", "developer-tools"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {},
  "related": []
}
---

# NemoClaw v0.0.121 release notes

## Annotation

First-party NVIDIA release notes for NemoClaw v0.0.121, used for claims about persisted MCP tool-denial policy and agent-owned skill lifecycle state.

## Relevant evidence

NVIDIA states that managed MCP servers can persist exact-name or glob-pattern tool denials and that status, restart, rebuild, and readiness checks use those persisted rules and can report drift. The release also moves skill lifecycle state to the selected agent rather than a parallel NemoClaw inventory, using agent-native skill operations when available.
