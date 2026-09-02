---
{
  "schema_version": 1,
  "id": "reference:anthropic:claude-fable-5-1",
  "title": "What's new in Claude Fable 5.1",
  "kind": "documentation",
  "publisher": "Anthropic",
  "canonical_url": "https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1",
  "published_at": "2026-09-01",
  "accessed_at": "2026-09-02",
  "authors": [],
  "topics": ["model-releases", "api-platforms", "agent-tooling", "context-engineering"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {},
  "related": []
}
---

# What's new in Claude Fable 5.1

## Annotation

Anthropic's first-party migration and capability guide for Claude Fable 5.1, including availability, context/output limits, pricing, breaking tool/thinking semantics, and new mid-conversation orchestration controls.

## Relevant evidence

Claude Fable 5.1 is available to all Claude API customers and on supported partner platforms with a 1M-token context window, 128k maximum output, and the same base input/output prices as Fable 5. Cache reads are $0.25 per million tokens, one quarter of the Fable 5 cache-read rate.

The migration is not behaviorally neutral: forced `tool_choice` modes `any` and `tool` return a 400 error; earlier models cannot consume Fable 5.1 thinking blocks; and editing earlier conversation content can invalidate later thinking blocks. Anthropic also documents beta controls for per-message effort, turn-scoped system messages, and readable progress updates between tool calls.
