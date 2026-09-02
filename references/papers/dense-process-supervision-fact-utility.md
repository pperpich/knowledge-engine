---
{
  "schema_version": 1,
  "id": "reference:arxiv:2609.00833",
  "title": "Dense Process Supervision for Search Agents via Fact Utility Estimation",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.00833",
  "published_at": "2026-09-01",
  "accessed_at": "2026-09-02",
  "authors": ["Rongzhi Zhu", "Xiangyu Liu", "Yi Liu", "Shuo Zhang", "Ruirui Zhang", "Rui Wu", "Tao Jiang", "Zequn Sun", "Wenhao Xu", "Wei Hu"],
  "topics": ["retrieval", "evaluation", "rag"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2609.00833", "doi": "10.48550/arXiv.2609.00833"},
  "related": []
}
---

# Dense Process Supervision for Search Agents via Fact Utility Estimation

## Annotation

EMNLP 2026 paper proposing fact-level credit assignment for search agents by converting observations into an explicit fact store, clustering equivalent facts, and estimating fact utility from grouped rollouts.

## Relevant evidence

The method models search as accumulation of discrete evidence facts, estimates posterior utility for semantic fact clusters with Bayesian inference over group rollouts, and converts those utilities into dense step-level rewards. The authors report consistent improvements over evaluated baselines across seven single-hop and multi-hop QA benchmarks, with ablations showing clearer relative gains on multi-hop QA versus outcome-reward-only training.
