---
{
  "schema_version": 1,
  "id": "reference:anthropic:claude-code-changelog",
  "title": "Claude Code changelog",
  "kind": "repository",
  "publisher": "Anthropic",
  "canonical_url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  "published_at": null,
  "accessed_at": "2026-09-01",
  "authors": ["Anthropic"],
  "topics": ["agent-tooling", "developer-tools", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "anthropics/claude-code"},
  "related": []
}
---

# Claude Code changelog

## Annotation

Maintainer changelog for Claude Code, reused under the stable canonical source identity established by recent draft briefs.

## Relevant evidence

Version 2.1.252, published August 31, changes several authority boundaries: Claude in Chrome browser actions now always pass through Claude Code permission checks; server-managed settings that terminate sandbox TLS, route traffic through a proxy, inject credentials, or weaken sandbox isolation require approval before applying; and sandboxed Bash command output files are created and read in a way that prevents the sandboxed command from redirecting or replacing them. The release also changes `CLAUDE_CODE_SUBAGENT_MODEL` from an unconditional override to a default that yields to an agent definition or explicit per-spawn model.
