---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-08-20",
  "title": "Agent runtime controls and conflict-preserving memory",
  "date": "2026-08-20",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "safety-and-security", "memory", "knowledge-graphs", "provenance", "evaluation"],
  "entities": ["OpenAI Agents SDK", "Docker", "Modal", "MELD"],
  "references": ["reference:openai:agents-python-v0.22.0", "reference:openai:agents-js-v0.17.0", "reference:arxiv:2608.16357"],
  "experiment": "experiment:2026-08-20:conflict-preserving-memory-merge",
  "related": [],
  "confidence": "medium",
  "status": "published"
}
---

# Agent runtime controls and conflict-preserving memory

## Three meaningful changes

1. **OpenAI's current Agents SDK release train adds first-class model-call timeouts in both Python and JavaScript.** Python v0.22.0 and JavaScript v0.17.0 include coordinated timeout controls around model calls, giving applications a framework-level liveness boundary rather than relying only on lower-level client or infrastructure timeouts. [Python release](https://github.com/openai/openai-agents-python/releases/tag/v0.22.0) · [JavaScript release](https://github.com/openai/openai-agents-js/releases/tag/v0.17.0)

2. **The same releases add run-scoped sandbox working directories.** Each run can operate from an isolated working directory instead of implicitly sharing one filesystem location across agent runs, making per-run filesystem state and cleanup easier to reason about. [Python release](https://github.com/openai/openai-agents-python/releases/tag/v0.22.0) · [JavaScript release](https://github.com/openai/openai-agents-js/releases/tag/v0.17.0)

3. **Sandbox infrastructure controls become more explicit across local and hosted execution.** Docker sandboxes can disable networking, while Modal sandbox integrations expose resource options in both SDKs. These are configuration primitives for limiting egress and compute resources; they are not a complete application security boundary. [Python release](https://github.com/openai/openai-agents-python/releases/tag/v0.22.0) · [JavaScript release](https://github.com/openai/openai-agents-js/releases/tag/v0.17.0)

## Why they matter

**Interpretation:** Agent frameworks are moving operational failure and authority boundaries into first-class runtime configuration. That matters as agents become longer-lived, execute code, and survive beyond a single request.

- **Timeouts create explicit liveness budgets.** Builders can define how long a model step may block a workflow, but still need idempotency and recovery logic for work that may already have produced external effects.
- **Run-scoped working directories reduce accidental cross-run state coupling.** They make filesystem provenance, cleanup, and reproducibility clearer when multiple agents or jobs share one sandbox backend.
- **Network and resource controls make sandbox policy more composable.** Egress and compute ceilings can be declared nearer to agent execution, while tool allowlists, secrets, mounts, and provider policy remain separate concerns.

These are three operational controls from one coordinated SDK release family, not three independent ecosystem signals. They are nevertheless materially different from the August 14 brief, which focused on model defaults, MCP migration, and resumable authority state.

## Knowledge-system research

An August 17 preprint, **MELD: A Protocol for Merging Knowledge Across Distributed Agentic Memories**, treats shared memory reconciliation as a provenance and conflict-management problem rather than simple vector deduplication. Incoming claims are classified as insert, merge, relate, conflict, or reject using claim identity, semantic similarity, natural-language inference, freshness, and context. Contradictions are preserved for later adjudication instead of silently choosing one claim. [Primary source](https://arxiv.org/abs/2608.16357)

The authors report a merge-classifier AUC of 0.968 with a 0.013 false-merge rate, 30/30 partition-heal reconvergence trials for their status CRDT versus 11/30 for last-write-wins, and roughly three times fewer routing messages at matched recall. These are author-reported preprint results and need independent replication. [Primary source](https://arxiv.org/abs/2608.16357)

**Interpretation:** Multi-agent memory needs an explicit answer to “what happens when two memories disagree?” A system that only retrieves the latest or nearest fact can erase useful disagreement and provenance. Conflict should sometimes be a first-class memory state rather than an error to collapse immediately.

## One experiment

Run [Test conflict-preserving memory merge against last-write-wins](../../../../experiments/proposed/exp-2026-08-20--conflict-preserving-memory-merge.md). It replays identical labeled updates into a last-write-wins store and a conflict-preserving store, then measures contradiction recall, silent overwrites, provenance completeness, and downstream QA quality with paired analysis and absolute quality guardrails.

## Risks or disagreements

- The three builder changes come from one coordinated OpenAI SDK release family, so they should be read as related runtime-hardening controls rather than independent market signals.
- A model timeout limits waiting; it does not guarantee cancellation of external side effects or exactly-once workflow semantics.
- Run-scoped directories and disabled Docker networking reduce specific classes of state leakage and egress, but do not replace credential isolation, tool authorization, mount policy, or application-level threat modeling.
- MELD is a recent preprint evaluated under a benign-fault model. Its classifier, CRDT, storage, and routing results may not transfer to adversarial peers or different memory distributions.
- The linked experiment tests conflict-preserving merge semantics only; it does not attempt to reproduce MELD's distributed CRDT or network-routing claims.

## Primary sources

- [OpenAI Agents SDK for Python v0.22.0](https://github.com/openai/openai-agents-python/releases/tag/v0.22.0)
- [OpenAI Agents SDK for JavaScript v0.17.0](https://github.com/openai/openai-agents-js/releases/tag/v0.17.0)
- [Lovén et al.: MELD — A Protocol for Merging Knowledge Across Distributed Agentic Memories](https://arxiv.org/abs/2608.16357)
