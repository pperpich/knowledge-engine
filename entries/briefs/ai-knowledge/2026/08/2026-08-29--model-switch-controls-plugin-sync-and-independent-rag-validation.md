---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-08-29",
  "title": "Model-switch controls, plugin sync, and independent RAG validation",
  "date": "2026-08-29",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "evaluation", "safety-and-security", "rag", "retrieval", "provenance"],
  "entities": ["Claude Code", "ChatGPT Work", "Codex", "TriShieldRAG"],
  "references": ["reference:anthropic:claude-code-changelog", "reference:openai:github-plugin-marketplace-sync", "reference:arxiv:2607.23838"],
  "experiment": "experiment:2026-08-29:independent-rag-validation",
  "related": [],
  "confidence": "medium",
  "status": "published"
}
---

# Model-switch controls, plugin sync, and independent RAG validation

## Three meaningful changes

1. **Claude Code added lifecycle hooks around model switching.** Version 2.1.251, published August 28, adds `PreModelSwitch` and `PostModelSwitch` hooks that can block, confirm, or annotate model transitions. Resume hooks also receive session-staleness and estimated re-cache-cost metadata. [Primary source](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

2. **Foreground subagent execution became more observable remotely.** The same Claude Code release streams a foreground subagent's tool calls and results to Remote Control clients rather than exposing only coarse task status, while also adding per-session prompt-cache telemetry. [Primary source](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

3. **OpenAI added Git-backed workspace distribution for plugins.** Enterprise and Edu admins can import supported plugin marketplaces from public or private GitHub repositories, with automatic daily sync enabled for new marketplaces. Workspace installation policy, app access, and authentication remain separately enforced; sync can add new marketplace entries. [Primary source](https://help.openai.com/en/articles/20001504)

## Why they matter

**Interpretation:** Agent platforms are moving operational policy closer to the execution lifecycle and treating reusable agent capability as governed software supply chain rather than static prompt configuration.

- Model-switch hooks let builders make a model transition an auditable policy event instead of an opaque runtime choice.
- Remote tool streaming makes delegated work easier to inspect while it is happening, which is especially useful for long-running or multi-agent workflows.
- Git-backed plugin marketplaces make repository review, branch strategy, and workspace policy part of plugin deployment. Automatic sync improves distribution speed but also increases the importance of reviewing repository changes before merge.

These changes are related operational controls, not evidence that agent quality itself improved.

## Knowledge-system research

TriShieldRAG v2 materially revises an earlier layered-defense result after testing adaptive retrieval poisoning. The authors report that a formatting-only attack bypassed the ingest guard on all 500 tested poisoned documents across three corpora; downstream reranking and cross-model consensus then provided little protection because those stages consumed the same compromised evidence. They also retract a proposed threshold formula after a preregistered prediction failed and withdraw the v1 headline result. [Primary source](https://arxiv.org/abs/2607.23838)

**Interpretation:** Adding more validators does not create independent evidence. In knowledge systems, provenance diversity and evidence independence may matter more than the number of downstream agreement stages when all of them read the same retrieved context.

## One experiment

Run [Test independent evidence validation against shared-context validation](../../../../experiments/proposed/exp-2026-08-29--independent-rag-validation.md). It holds the generator and primary retrieval set fixed, then compares validation using the same retrieved context against validation that receives a separately indexed trusted evidence shard.

## Risks or disagreements

- Claude Code v2.1.251 is a maintainer release; the operational benefits of its hooks and telemetry are not independently benchmarked.
- OpenAI's marketplace sync is workspace infrastructure, not a security guarantee. Automatic sync can introduce new plugin entries, so repository governance remains part of the trust boundary.
- TriShieldRAG is a recent preprint and its adaptive attack is one threat model. Its strongest transferable lesson is narrower than “layered RAG defenses do not work”: defenses that depend on the same compromised evidence can fail together.
- The proposed experiment intentionally uses a clean trusted shard to isolate evidence independence; real production systems may not have such a source.

## Primary sources

- [Anthropic: Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [OpenAI: Importing and syncing plugin marketplaces from GitHub](https://help.openai.com/en/articles/20001504)
- [Mohanty et al.: TriShieldRAG](https://arxiv.org/abs/2607.23838)
