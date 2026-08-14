---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.03463",
  "title": "LeanMem: Simple and Efficient Long-Term Memory for LLM Agents",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.03463",
  "published_at": "2026-08-04",
  "accessed_at": "2026-08-07",
  "authors": ["Yuxin Liao", "Le Wu", "Min Hou", "Hao Liu", "Han Wu", "Zishu Wang"],
  "topics": ["memory", "retrieval", "context-engineering"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.03463", "doi": "10.48550/arXiv.2608.03463"},
  "related": []
}
---

# LeanMem: Simple and Efficient Long-Term Memory for LLM Agents

## Annotation

Recent preprint proposing heterogeneous long-term agent memory instead of applying one summarization strategy to all historical dialogue.

## Relevant evidence

LeanMem routes useful history into compact profile memory, temporal event memory, or source-grounded record memory, selectively evolves event memory, and adapts evidence retrieval to each query. On LoCoMo and LongMemEval-S, the authors report higher accuracy than the strongest memory-based baselines across GPT-4.1-mini and Qwen3-8B settings while using low or near-low construction tokens, inference tokens, and latency. Accuracy is LLM-judged and the work is a recent preprint, so transfer to production corpora requires independent testing.
