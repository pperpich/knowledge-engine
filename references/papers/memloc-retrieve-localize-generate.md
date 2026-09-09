---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.07093",
  "title": "Where to Look and What to Use: Retrieve-Localize-Generate for Long-Term Conversational Memory Question Answering",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.07093",
  "published_at": null,
  "accessed_at": "2026-09-09",
  "authors": ["Yifan Wang", "Xinkui Lin", "Yongxiu Xu", "Shen Gao", "Ruochen Yang", "Kun Huang", "Yubin Wang", "Jie Wu", "Wei Liu", "Jian Luan", "Hongbo Xu", "Shuo Shang"],
  "topics": ["memory", "retrieval", "reranking", "rag", "knowledge-graphs", "context-engineering", "evaluation", "provenance"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"arxiv": "2609.07093"},
  "related": []
}
---

# Where to Look and What to Use: Retrieve-Localize-Generate for Long-Term Conversational Memory Question Answering

## Annotation

Original MemLoc paper, listed by arXiv as accepted to the EMNLP 2026 Main Conference. It is the primary research source for separating conversational-memory retrieval from within-memory evidence localization.

## Relevant evidence

The authors describe a three-stage Retrieve-Localize-Generate pipeline. Retrieval uses multi-granularity memory units plus within-session and cross-session graph structure. Localization extracts query-relevant fragments, reranks candidates, and attaches lightweight location IDs used by the generator for grounding. The authors report improved retrieval accuracy and response quality across their evaluated long-term memory QA benchmarks; because the method combines several trained components, those end-to-end results do not isolate localization alone.
