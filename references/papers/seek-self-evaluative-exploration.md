---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.28980",
  "title": "Seek: Self-Evaluative Exploration for Knowledge Retrieval",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.28980",
  "published_at": "2026-09-24",
  "accessed_at": "2026-09-25",
  "authors": ["Amin Bigdeli", "Radin Hamidi Rad", "Negar Arabzadeh", "Sajad Ebrahimi", "Hai Son Le", "Charles L. A. Clarke", "Ebrahim Bagheri"],
  "topics": ["retrieval", "reranking", "evaluation", "context-engineering"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"arxiv": "2609.28980", "doi": "10.1145/3799682.3840031"},
  "related": []
}
---

# Seek: Self-Evaluative Exploration for Knowledge Retrieval

## Annotation

Original paper on training-free iterative retrieval using feedback-conditioned pseudo-passages and graded relevance assessment.

## Relevant evidence

Seek repeatedly generates pseudo-passages from accumulated relevance feedback, retrieves fresh candidates, and assesses relevance for later rounds. The authors report consistent Recall@100 gains over single-pass BM25 on TREC Deep Learning and, on BRIGHT, an 82% relative gain over BM25 with Qwen2.5-7B; GPT-4.1 reaches 37.4 average nDCG@10, reported as 37% above the strongest baseline. These are author-reported results and do not by themselves establish production cost-effectiveness.
