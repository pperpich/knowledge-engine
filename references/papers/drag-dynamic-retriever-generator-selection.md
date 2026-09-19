---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.17709",
  "title": "One Size Does Not Fit All! Dynamic Retriever and Generator Selection for RAG",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.17709",
  "published_at": "2026-09-15",
  "accessed_at": "2026-09-19",
  "authors": ["Neeraj Anand", "Payel Santra", "Partha Basuchowdhuri", "Debasis Ganguly", "Sumit Bhatia"],
  "topics": ["rag", "retrieval", "evaluation"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"arxiv": "2609.17709"},
  "related": []
}
---

# One Size Does Not Fit All! Dynamic Retriever and Generator Selection for RAG

## Annotation

Original preprint introducing DRAG, a query-adaptive framework that jointly selects retriever and generator configurations rather than applying one fixed RAG stack to every query.

## Relevant evidence

The authors report experiments spanning factoid and multi-hop QA, three LLM families, and four QA benchmarks. They find that stronger retrieval often contributes more than additional generation effort but that both show diminishing or non-monotonic returns. Their training-free router uses query-performance-prediction signals for retriever choice and retrieved-context perplexity signals for generator choice; a supervised variant jointly predicts both. Results are author-reported preprint evidence and should not be treated as independent production validation.
