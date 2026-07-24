---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-07-24",
  "title": "Production agents, grounded search, and RAG robustness",
  "date": "2026-07-24",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "evaluation", "retrieval", "provenance", "rag", "context-engineering"],
  "entities": ["OpenAI Presence", "Gemini Enterprise Agent Platform", "Parallel Web Search", "Tunix"],
  "references": ["reference:openai:presence", "reference:google:parallel-web-grounding", "reference:google:tunix-agentic-rl", "reference:arxiv:2605.27105"],
  "experiment": "experiment:2026-07-24:retrieval-order-robustness",
  "related": [],
  "confidence": "medium",
  "status": "published"
}
---

# Production agents, grounded search, and RAG robustness

## Three meaningful changes

1. **OpenAI introduced Presence for managed enterprise agent deployment.** Presence combines policies, guardrails, approved actions, simulations, evaluation tooling, escalation rules, and a Codex-assisted improvement loop. It is currently offered through limited general availability to eligible enterprise customers rather than as a self-serve API product. [Primary source](https://openai.com/index/introducing-openai-presence/)

2. **Google added Parallel Web Search as a native grounding provider in Gemini Enterprise Agent Platform.** The integration returns structured real-time web results with citation annotations and permits architectures that extract, cache, post-process, or pass results to other models. [Primary source](https://developers.googleblog.com/en/expanding-choice-in-gemini-enterprise-agent-platform-introducing-grounding-with-parallel-web-search/)

3. **Google described Tunix infrastructure for high-throughput agentic reinforcement learning.** The central problem is accelerator idle time while agents wait for tools or environments during multi-turn rollouts; Tunix is positioned as infrastructure for improving throughput in those workloads. [Primary source](https://developers.googleblog.com/scaling-agentic-rl-high-throughput-agentic-training-with-tunix/)

## Why they matter

**Interpretation:** The builder delta is shifting from isolated model capability toward operational systems around agents: controlled actions, continuous evaluation, grounded retrieval, and training infrastructure that accounts for real tool latency.

- **Presence:** evaluation, policy enforcement, escalation, and post-deployment improvement are becoming deployment primitives rather than separate operational projects.
- **Parallel grounding:** citation structure, result reuse, caching, and downstream-model compatibility are architectural properties of a search provider, not just procurement details.
- **Tunix:** agent-training throughput depends on overlapping accelerator work with slow tool and environment interactions; model quality alone does not solve idle infrastructure.

For builders, the common implication is that agent quality increasingly depends on the surrounding control plane: provenance, permissions, evals, observability, and reproducible iteration.

## Knowledge-system research

A recent reproducibility study accepted at SIGIR 2026 revisited document-position and context-size effects in RAG. The authors found that small topic samples can exaggerate or hide ordering effects, and that results from idealized oracle-retrieval setups may not transfer to systems with imperfect retrieval. [Primary source](https://arxiv.org/abs/2605.27105)

**Interpretation:** Knowledge-system evaluations should vary both retrieval quality and evidence order. A single aggregate benchmark can conceal brittle behavior, especially when topic counts are small or an LLM judge is the only evaluator.

Practical takeaway: freeze retrieved passage sets, permute evidence order, use paired scoring, and report variance across topics rather than only mean accuracy.

## One experiment

Run the linked experiment, [Measure retrieval-order robustness on a small knowledge corpus](../../../../experiments/proposed/exp-2026-07-24--retrieval-order-robustness.md), to isolate whether evidence placement changes answer accuracy or citation support while holding the retrieved passage set constant.

## Risks or disagreements

- Presence is a vendor-managed enterprise offering with limited availability; the announcement does not provide enough pricing, deployment, portability, or independent evaluation data to judge broader applicability.
- Parallel grounding expands architectural flexibility, but real quality, cost, licensing, retention, and latency tradeoffs require workload-specific evaluation.
- Tunix's infrastructure claims are described by the maintainer; independent benchmark evidence was not identified in this run.
- The RAG study is recent conference research. Its conclusions are useful for experiment design but may not generalize across all models, corpora, retrievers, and production constraints.

## Primary sources

- [OpenAI: Introducing OpenAI Presence](https://openai.com/index/introducing-openai-presence/)
- [Google: Grounding with Parallel Web Search](https://developers.googleblog.com/en/expanding-choice-in-gemini-enterprise-agent-platform-introducing-grounding-with-parallel-web-search/)
- [Google: Scaling Agentic RL with Tunix](https://developers.googleblog.com/scaling-agentic-rl-high-throughput-agentic-training-with-tunix/)
- [Gabín, Perez, and Parapar: Lost in the Evidence?](https://arxiv.org/abs/2605.27105)
