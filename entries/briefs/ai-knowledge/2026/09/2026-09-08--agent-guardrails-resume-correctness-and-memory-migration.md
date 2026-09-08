---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-09-08",
  "title": "Agent Guardrail Boundaries, Resume Correctness, and Memory Migration",
  "date": "2026-09-08",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "mcp", "safety-and-security", "memory", "provenance", "retrieval", "evaluation"],
  "entities": ["OpenAI Agents SDK", "Model Context Protocol"],
  "references": ["reference:openai:agents-python-v0.22.0", "reference:arxiv:2609.05339"],
  "experiment": "experiment:2026-09-08:memory-upgrade-compatibility-gate",
  "related": [],
  "confidence": "medium",
  "status": "published"
}
---

# Agent Guardrail Boundaries, Resume Correctness, and Memory Migration

## Three meaningful changes

1. **MCP policy can move up to the server boundary.** OpenAI Agents Python v0.22.1, released September 8, adds server-wide guardrails for MCP tools and configurable blocked messages for output guardrails. This is a new enforcement surface above per-tool wrapping, not a replacement for tool authorization or application validation. [OpenAI Agents Python v0.22.1](https://github.com/openai/openai-agents-python/releases/tag/v0.22.1)

2. **Local execution gets a more explicit failure boundary.** The same release adds configurable Unix-local environment isolation and changes empty tool arguments to fail closed. These are separate controls: environment isolation limits what a local sandbox inherits, while fail-closed parsing avoids treating missing tool arguments as benign input. [OpenAI Agents Python v0.22.1](https://github.com/openai/openai-agents-python/releases/tag/v0.22.1)

3. **Resume correctness is increasingly a persistence problem, not just an orchestration problem.** v0.22.1 fixes recovery before model calls when resumed session writes fail, persists resumed tool-guardrail results, recovers handoffs after append failures, preserves concurrent writes during compaction, and rejects resume when an accepted terminal output was not persisted. **Interpretation:** long-running agent tests should inject failures at session-write, handoff, guardrail, and compaction boundaries rather than evaluating only clean resumes. [OpenAI Agents Python v0.22.1](https://github.com/openai/openai-agents-python/releases/tag/v0.22.1)

## Why they matter

For builders using MCP, a server-wide guardrail can reduce policy drift across a large tool surface because one integration boundary can enforce a common check. The important implementation question is still *which* actions the server exposes and authorizes; a guardrail cannot repair an over-broad capability model.

For local tool execution, explicit environment isolation makes inherited process state a testable configuration choice. Pair it with negative tests for missing arguments and with least-privilege filesystem, credential, and network controls rather than assuming “sandboxed” implies complete isolation.

For durable agents, resume behavior now deserves database-style invariants: no model step should proceed from state whose required writes failed, and accepted outcomes should not be replayable as durable state unless they were persisted. That suggests fault-injection tests around every boundary that can acknowledge work before durable state is committed.

## Knowledge-system research

A September 4 preprint, **“Does Your Agent’s Memory Survive a Model Upgrade?”**, compares raw history, dense RAG, model-written notes, and a fixed-schema knowledge graph across writer, reader, embedder, and repair migrations. It uses 48 synthetic histories, randomized answer codes, exact scoring, and two sub-10B open-weight models. The authors report that fixed-schema memory was nearly unchanged under writer swap, while free-form notes changed sharply and asymmetrically by migration direction. In their RAG setup, a 50/50 mixed old/new embedding index recovered only part of the gain from full re-embedding, and raw-history repair outperformed store-only note repair. [Goyal & Ray, arXiv:2609.05339](https://arxiv.org/abs/2609.05339)

**Interpretation:** durable memory should be treated as a compatibility surface with its own migration tests. Source-linked structured records are attractive because they constrain the writer and preserve repair paths; embedding migrations should be treated independently from reader-model migrations.

**Uncertainty:** this is a preprint on synthetic histories with only Llama-3.1-8B-Instruct and Qwen2.5-7B-Instruct-1M. Its RAG baseline is intentionally a single-stage dense retriever without reranking or lexical fusion, and the fixed-schema store uses a different read path from free-form notes. The paper was published September 4, one day before the prior September 5 brief; it is included as an uncaptured recent result, not presented as a post-run publication.

## One experiment

Run a **memory-upgrade compatibility gate**: compare a source-linked fixed-schema store with model-written free-form notes when a new reader model inherits memory written by the old model. Freeze histories, reader prompts, context budgets, scoring, and migration direction; compare each inherited store against a fresh store written for the new reader.

Success requires the structured store’s migration loss to remain within 5 percentage points with at least 80% absolute correctness and 90% citation support, while its migration loss is at least 5 points lower than the notes condition with a paired 95% confidence interval excluding zero. See the linked experiment for definitions, sample size, and stop conditions.

## Risks or disagreements

The v0.22.1 release notes establish that these controls and fixes shipped; they do not establish how often the underlying failure modes occur in production or that the release closes every equivalent path.

Centralized MCP guardrails can simplify enforcement but also increase blast radius if the shared policy is wrong. Authorization, schema validation, sandbox boundaries, and audit logging remain distinct controls.

The memory-portability paper provides controlled evidence for one model pair and synthetic workload, not a universal ranking of memory architectures. Its fixed schema fits the tested task, and its retrieval baseline is deliberately simple, so the local experiment should test portability on representative histories before changing production memory design.

## Primary sources

- [OpenAI Agents SDK for Python v0.22.1 release notes](https://github.com/openai/openai-agents-python/releases/tag/v0.22.1)
- [Goyal & Ray, “Does Your Agent’s Memory Survive a Model Upgrade?”, arXiv:2609.05339](https://arxiv.org/abs/2609.05339)
