---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.03874",
  "title": "STAIR (STructure Aware Information Retriever): A novel dataset and LLM based retriever for document structure augmentation",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.03874",
  "published_at": "2026-09-03",
  "accessed_at": "2026-09-05",
  "authors": ["Vineet Kumar", "Meghanadh Pulivarthi", "vishwajeet kumar", "Jaydeep Sen", "Riyaz Ahmad Bhat", "Sachindra Joshi"],
  "topics": ["retrieval", "rag", "context-engineering", "evaluation"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2609.03874", "doi": "10.48550/arXiv.2609.03874"},
  "related": []
}
---

# STAIR (STructure Aware Information Retriever): A novel dataset and LLM based retriever for document structure augmentation

## Annotation

September 2026 preprint studying whether explicit global document structure, particularly table-of-contents information, can improve retrieval over long structured documents.

## Relevant evidence

The authors combine document structure with a finetuned Differentiable Search Index and introduce SearchTome, a benchmark of 18 books across six domains. They report Recall@1 of 82.6% for STAIR versus 76.9% for their DSI baseline, 59.5% for BM25, and 68.7% for DPR. Because the method couples structural information with a trained generative retriever, the reported gains do not isolate the causal contribution of structure alone.