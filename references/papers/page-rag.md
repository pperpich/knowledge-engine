---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.29753",
  "title": "PAGE-RAG: Provenance-Aware Graph Evidence Promotion for Fixed-Budget Multi-hop Retrieval-Augmented Generation",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.29753",
  "published_at": "2026-08-30",
  "accessed_at": "2026-09-01",
  "authors": ["Haokun Deng", "Xunkai Li", "Hongchao Qin", "Rong-Hua Li"],
  "topics": ["rag", "retrieval", "reranking", "provenance", "context-engineering", "evaluation"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.29753", "doi": "10.48550/arXiv.2608.29753"},
  "related": []
}
---

# PAGE-RAG

## Annotation

Recent preprint on selecting jointly supporting evidence from an expanded multi-hop retrieval pool while keeping the final reader context budget fixed.

## Relevant evidence

PAGE-RAG builds a query-local graph over retrieved candidates and records why candidates are connected, while treating connectivity as a support hypothesis rather than proof of support. The authors score candidate paths using relevance, source-tracing metadata, specificity, hubness, noise, and coherence, then promote a minimal sufficient evidence set. Across three multi-hop QA benchmarks under the same final reader budget, they report weighted-average gains of 10.4 points in support F1 and 3.3 points in answer F1 over a strong retriever. These are author-reported preprint results and should not be assumed to transfer to other corpora or retrieval stacks.
