---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.02745",
  "title": "Incremental Pooled LLM Evaluation for Cost-Effective Retrieval Model Selection",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.02745",
  "published_at": "2026-09-02",
  "accessed_at": "2026-09-03",
  "authors": ["Max Nelson", "Hanoz Bhathena", "Aviral Joshi", "Saket Sharma"],
  "topics": ["retrieval", "evaluation", "rag"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2609.02745", "doi": "10.48550/arXiv.2609.02745"},
  "related": []
}
---

# Incremental Pooled LLM Evaluation for Cost-Effective Retrieval Model Selection

## Annotation

A September 2 preprint evaluating whether relevance judgments can be pooled and reused as retrieval configurations are added over time, reducing repeated evaluation work.

## Relevant evidence

The authors evaluate 11 dense, sparse, and hybrid retrieval systems across four benchmarks and report that 97% of pairwise system orderings are preserved after accounting for bootstrap uncertainty in the pooled qrels. In a financial-news QA deployment covering 62 retrieval configurations, document overlap produced 65-80% judgment reuse and up to 4.9x lower evaluation cost. These are author-reported results and depend on LLM-generated relevance judgments.