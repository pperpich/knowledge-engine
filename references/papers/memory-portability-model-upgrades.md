---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.05339",
  "title": "Does Your Agent's Memory Survive a Model Upgrade? A Controlled Study of Memory Portability",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.05339",
  "published_at": "2026-09-04",
  "accessed_at": "2026-09-08",
  "authors": ["Ankit Goyal", "Jaideep Ray"],
  "topics": ["memory", "provenance", "retrieval", "rag", "evaluation"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"arxiv": "2609.05339"},
  "related": []
}
---

# Does Your Agent's Memory Survive a Model Upgrade? A Controlled Study of Memory Portability

## Annotation

Original preprint studying how raw history, dense RAG, free-form model-written notes, and fixed-schema knowledge-graph memory behave when writer models, reader models, embedding models, or repair inputs change.

## Relevant evidence

Across 48 synthetic histories and two sub-10B open-weight models, the authors report nearly unchanged fixed-schema accuracy under writer swap, large direction-dependent changes for free-form notes, a material penalty from mixing old and new embedding vectors instead of fully re-embedding, and better repair when raw source history is retained. The study is controlled but narrow: one model pair, synthetic histories, and a deliberately simple single-stage dense RAG baseline.
