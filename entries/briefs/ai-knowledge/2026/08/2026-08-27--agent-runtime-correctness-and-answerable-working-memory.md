---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-08-27",
  "title": "Agent runtime correctness and answerable working memory",
  "date": "2026-08-27",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "mcp", "safety-and-security", "memory", "evaluation", "rag", "provenance"],
  "entities": ["Claude Code", "Model Context Protocol", "AWM"],
  "references": ["reference:anthropic:claude-code-changelog", "reference:arxiv:2608.25618"],
  "experiment": "experiment:2026-08-27:working-memory-answerability-audit",
  "related": [],
  "confidence": "medium",
  "status": "published"
}
---

# Agent runtime correctness and answerable working memory

## Three meaningful changes

1. **Claude Code tightened MCP and permission semantics in v2.1.246.** Interrupted MCP calls in headless or remote sessions are now reported explicitly as interrupted rather than as successful calls with no output; MCP tools marked `requiresUserInteraction` no longer offer a misleading persistent-approval option; malformed Bash commands ending in `&&` or `||` always require approval; and telemetry requests no longer carry credentials configured for a third-party API gateway to Anthropic hosts. [Primary source](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)

2. **Project context can now change safely inside a running session.** After `/cd`, Claude Code immediately loads the destination directory's project settings, hooks, approved `.mcp.json` servers, skills, and agents instead of waiting for a resumed session. This turns directory changes into a real runtime context transition rather than a cosmetic working-directory change. [Primary source](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)

3. **Unattended and multi-agent execution gained clearer failure and recovery behavior.** Non-interactive sessions now automatically continue after a mid-stream server error, connection loss, or stall; subagents that hit `maxTurns` return output explicitly marked partial; v2.1.247 adds fallback-model use when a subagent's first model call returns 404 and reports lost background work after a cloud container restart. [Primary source](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)

These are three distinct operational changes from one coordinated Claude Code release family, not three independent ecosystem signals.

## Why they matter

**Interpretation:** Agent reliability is increasingly determined by whether the runtime preserves semantic truth about what actually happened — which tool ran, whether it completed, which policy applied, which project context is active, and whether an intermediate result is complete.

- **Permission and MCP correctness:** a false "completed" tool result or ineffective approval rule can cause the model to reason from an event that never occurred. Runtime status is part of the agent's evidence, not just UI plumbing.
- **Dynamic project context:** agents that move across repositories or worktrees need configuration, tools, hooks, and local policy to follow the active directory. Otherwise, the filesystem location and the agent's authority/context can silently diverge.
- **Durable unattended execution:** retrying transport failures is useful only when partial work and subagent completion state remain explicit. Builders should treat partial, interrupted, failed, and resumed as first-class trajectory states rather than compressing them into success/failure booleans.

## Knowledge-system research

A new preprint, **AWM: Answerable Working Memory for Long-Document VQA Agents**, proposes a useful diagnostic: after an agent finishes inspecting a long document, can a separate reader answer the original question using only the agent's terminal working memory? The authors report that on MMLongBench-Doc, even when gold evidence pages were supplied, 42.5% of trajectories with correct final answers left working memory that was not independently answerable. Their training method, AWM-GRPO, adds a reward for answer-supporting terminal memory while preserving final-answer priority and reports higher final-answer accuracy on two long-document VQA benchmarks. [Primary source](https://arxiv.org/abs/2608.25618)

**Interpretation:** Final-answer accuracy can hide a provenance and handoff failure. If an agent reaches the right evidence but writes weak memory, retries, downstream agents, audits, and future turns may not be able to reconstruct why the answer was justified. "Did the agent answer correctly?" and "Did it leave an answerable evidence artifact?" are separate evaluation questions.

The result is recent preprint evidence in a long-document visual-QA setting, so the reported percentages should not be assumed to transfer directly to coding agents, general RAG, or organizational memory systems. The diagnostic itself is broader and easy to test locally.

## One experiment

Run [Audit whether agent working memory remains answerable](../../../../experiments/proposed/exp-2026-08-27--working-memory-answerability-audit.md). On at least 40 correctly answered long-document trajectories, hide the source documents, retrieved pages, and final answer from an independent evaluator and test whether the terminal working memory alone is sufficient to reproduce the correct answer with supporting evidence.

The experiment keeps the production model, retriever, prompts, and memory policy unchanged. It is an audit of a hidden quality dimension, not a comparison of new memory architectures.

## Risks or disagreements

- The Claude Code items come from a fast-moving maintainer changelog. They are concrete shipped behaviors, but this brief groups them into three operational themes rather than treating every changelog line as independently material.
- Automatic continuation after transport failures improves durability but does not by itself guarantee idempotency; builders still need tool-level safeguards against repeating side effects after uncertain failures.
- Reloading project-local MCP servers, skills, and hooks after `/cd` increases contextual correctness but also makes directory transitions security-sensitive. The changelog states that `.mcp.json` servers still use the usual approval prompt.
- AWM is a recent preprint, and its strongest quantitative findings are benchmark- and training-specific. Memory-only answerability is best treated as an evaluation hypothesis to validate on the local workload.

## Primary sources

- [Anthropic: Claude Code changelog](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)
- [Zhou et al.: AWM: Answerable Working Memory for Long-Document VQA Agents](https://arxiv.org/abs/2608.25618)
