---
{
  "schema_version": 1,
  "id": "reference:anthropic:claude-code-changelog",
  "title": "Claude Code changelog",
  "kind": "repository",
  "publisher": "Anthropic",
  "canonical_url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  "published_at": null,
  "accessed_at": "2026-08-29",
  "authors": ["Anthropic"],
  "topics": ["agent-tooling", "developer-tools", "evaluation", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"repository": "anthropics/claude-code"},
  "related": []
}
---

# Claude Code changelog

## Annotation

Maintainer changelog for Claude Code. The August 28, 2026 v2.1.251 release adds model-switch lifecycle hooks, richer prompt-cache and resume metadata, live Remote Control streaming for foreground subagents, and multiple permission-boundary fixes.

## Relevant evidence

Version 2.1.251 adds `PreModelSwitch` and `PostModelSwitch` hooks that can block, confirm, or annotate model transitions; resume hooks receive session staleness and estimated re-cache cost. It also streams foreground subagent tool calls and results to Remote Control clients and exposes per-session prompt-cache telemetry. Security fixes include symlink/path traversal protections and stronger approval requirements for managed settings that can weaken sandbox or routing boundaries.
