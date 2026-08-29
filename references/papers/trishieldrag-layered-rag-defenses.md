---
{
  "schema_version": 1,
  "id": "reference:arxiv:2607.23838",
  "title": "TriShieldRAG: 3 Rings, One Blind Spot in Layered Defenses for Retrieval-Augmented Generation",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2607.23838",
  "published_at": "2026-07-26",
  "accessed_at": "2026-08-29",
  "authors": ["Susil Kumar Mohanty", "Rohit Patel", "Kosuru Yuvaraj", "Jeenal Chaudhary", "Disha Singhania"],
  "topics": ["rag", "retrieval", "reranking", "evaluation", "safety-and-security", "provenance"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2607.23838", "doi": "10.48550/arXiv.2607.23838"},
  "related": []
}
---

# TriShieldRAG

## Annotation

Recent preprint evaluating layered defenses against retrieval poisoning. Version 2 materially revises the earlier result after adaptive attacks and a failed preregistered prediction exposed limits in defenses that consume the same poisoned evidence.

## Relevant evidence

The v2 abstract reports that an adaptive formatting change bypassed the ingest guard on all 500 tested poisoned documents across three corpora. Downstream reranking and cross-model consensus then provided little protection; cross-model agreement could remain high even when attack success was high. The authors withdraw the v1 headline result and retract a proposed closed-form threshold after a preregistered prediction failed.
