---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.26836",
  "title": "SymbolLKG: Towards Verifiable Logical Reasoning via Logical Knowledge Graph and Symbolic Solvers",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.26836",
  "published_at": "2026-08-27",
  "accessed_at": "2026-08-28",
  "authors": ["Haizhao Fan", "Yuchi Xiong", "Jize Wang", "Xinping Guan", "Xinyi Le"],
  "topics": ["knowledge-graphs", "retrieval", "rag", "evaluation", "provenance"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.26836", "doi": "10.48550/arXiv.2608.26836"},
  "related": []
}
---

# SymbolLKG

## Annotation

Recent preprint proposing a neuro-symbolic retrieval and reasoning architecture in which logical rules and constraints are represented as first-class knowledge-graph nodes and routed to symbolic solvers.

## Relevant evidence

The authors argue that standard semantic RAG can miss structural dependencies needed for strict multi-step logical tasks. SymbolLKG combines an ontology-based logical knowledge graph, topology-aware hybrid retrieval, and dynamic solver routing. The paper reports higher accuracy than the prompting and RAG baselines evaluated and produces explicit reasoning paths; these are author-reported preprint results and need independent replication.
