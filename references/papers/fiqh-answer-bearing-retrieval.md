---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.20246",
  "title": "What Makes a Good Fiqh Retriever? Answer Retrieval for Arabic Islamic Jurisprudence",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.20246",
  "published_at": "2026-08-20",
  "accessed_at": "2026-08-21",
  "authors": ["Somaya Eltanbouly", "Heba Sbahi", "Samer Rashwani", "Abdessalam Bouchekif", "Mutaz al-Khatib", "Shahd Gaben", "Mohammed Ghaly"],
  "topics": ["retrieval", "reranking", "evaluation"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.20246"},
  "related": []
}
---

# What Makes a Good Fiqh Retriever?

## Annotation

A recent preprint studying answer-bearing passage retrieval for Arabic Islamic jurisprudence, including lexical, dense, hybrid, fine-tuned, and school-aware retrieval strategies.

## Relevant evidence

The paper defines relevance around whether a passage actually states the ruling required by a question rather than merely sharing its topic. The authors report that metadata-aware school filtering more than doubles MRR@5 on school-specific questions, while fine-tuning improves the strongest reported retriever from 0.524 to 0.553 MRR@5. The main reported error mode is ranking topically similar passages that do not contain the requested answer.
