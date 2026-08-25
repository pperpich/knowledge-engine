---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-08-25",
  "title": "Agent evaluation, MCP migration, and memory retention",
  "date": "2026-08-25",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "evaluation", "mcp", "memory", "context-engineering"],
  "entities": ["OpenAI Codex", "Google Agent Development Kit", "Claude Code", "Weighted Memory Tree"],
  "references": ["reference:openai:codex-release-notes-2026-08-24", "reference:google:adk-live-evaluation-2026-08-24", "reference:anthropic:claude-code-2.1.243", "reference:arxiv:2608.20631"],
  "experiment": "experiment:2026-08-25:retention-scored-memory",
  "related": ["brief:ai-knowledge:2026-08-23", "brief:ai-knowledge:2026-08-20"],
  "confidence": "medium",
  "status": "published"
}
---

# Agent evaluation, MCP migration, and memory retention

## Three meaningful changes

1. **OpenAI deprecated the `codex mcp-server` command on August 24.** The release notes direct builders to the Codex app server instead and recommend the Codex plugin when using Codex from Claude Code. This is a migration signal: integrations that treat Codex itself as an MCP server should move to the newer app-server/plugin path rather than assume the old command will remain supported. [Primary source](https://openai.com/products/release-notes/)

2. **Google ADK added native evaluation for live voice agents.** ADK can now run graph-based live agents against simulated users that generate actual audio, score end-to-end behavior with natural-language rubrics, inspect transcripts and audio in ADK Web, and run the same evaluation pipeline from the CLI or CI. [Primary source](https://developers.googleblog.com/how-to-evaluate-live-voice-agents-in-adk/)

3. **Claude Code 2.1.243 made long-running agent behavior more observable and configurable.** The changelog adds per-loop usage breakdowns, organization-managed model pricing, configurable model pickers, separate prompt-cache TTLs for main and subagent conversations, and model/effort visibility for subagents. It also improves recovery for dropped remote MCP connections. [Primary source](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

## Why they matter

**Interpretation:** The practical builder delta is increasingly about lifecycle control rather than adding another model call.

- **Migration surfaces:** tool protocols and integration entry points are changing quickly enough that builders should isolate protocol adapters instead of wiring product-specific commands deeply into orchestration code.
- **Evaluation surfaces:** live voice agents now have a more production-like regression loop. Multi-turn timing, tool use, and handoffs can be tested as trajectories rather than judged from isolated transcripts.
- **Operational observability:** recurring loops and subagents need cost, model, cache, and recovery visibility. Without that, background autonomy can turn into silent token burn or brittle failure recovery.

A useful design principle is to keep integration, evaluation, and runtime-observability layers independently replaceable. The model should not be the only component with a version boundary.

## Knowledge-system research

A recent preprint, **Weighted Memory Tree**, proposes a hierarchical memory structure that organizes execution into tasks, subtasks, and actions while assigning dynamic retention scores. Event-based updates and decay determine which memories remain active, which are folded, and which are suppressed. On GAIA-Text, the authors report an average 9.97 percentage-point accuracy gain over linear memory while reducing prompt-token usage by 32.8%; they also report better resilience to injected unreliable memories. [Primary source](https://arxiv.org/abs/2608.20631)

**Interpretation:** This shifts the memory problem from “what should retrieval return?” toward “what should remain active enough to be retrievable at all?” That complements the prior brief’s memory-commitment gate: durable writes need policy, but retained history also needs ongoing utility management.

The paper was submitted on August 21 and was not covered in the prior 30-day stream. Its results are author-reported preprint evidence and should be treated as a design hypothesis rather than a production guarantee.

## One experiment

Run [Test retention-scored memory against a linear history baseline](../../../../experiments/proposed/exp-2026-08-25--retention-scored-memory.md). The experiment holds model, tasks, retrieval method, and token budget constant while changing only the memory-retention policy.

## Risks or disagreements

- OpenAI's release note marks the old Codex MCP server command as deprecated but does not specify a removal date, so migration urgency is directional rather than deadline-based.
- Google's live evaluation uses LLM-driven simulation and rubric scoring; these are useful regression tools but are not substitutes for real-user latency, audio-quality, and failure testing.
- Claude Code 2.1.243 shipped many runtime and observability changes together. Their practical value depends on using loops, subagents, managed settings, or remote MCP connections.
- Weighted Memory Tree is a recent preprint evaluated on a limited task setup and a small set of models. Its reported gains may depend on the retention heuristic, benchmark shape, and baseline implementation.

## Primary sources

- [OpenAI: Release notes — Codex MCP server command deprecated](https://openai.com/products/release-notes/)
- [Google Developers Blog: How to Evaluate Live & Voice Agents in ADK](https://developers.googleblog.com/how-to-evaluate-live-voice-agents-in-adk/)
- [Anthropic: Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [Dao, Kathalkar, and Eaton: Weighted Memory Tree](https://arxiv.org/abs/2608.20631)
