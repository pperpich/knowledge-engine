---
{
  "schema_version": 1,
  "id": "reference:paper:se-gos:2609.08228",
  "title": "SE-GoS: Self-Evolving Graph-of-Skills for Skill Library at Scale",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.08228",
  "published_at": "2026-09-08",
  "accessed_at": "2026-09-11",
  "authors": ["Dawei Fu", "Cheng Jiang", "Sitian Qian", "Huainan Wang", "Zhongkai Hao"],
  "topics": ["agent-tooling", "evaluation", "knowledge-graphs", "retrieval"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"arxiv": "2609.08228"},
  "related": []
}
---

# SE-GoS: Self-Evolving Graph-of-Skills for Skill Library at Scale

## Annotation

September 8, 2026 arXiv preprint on using execution traces to evolve a graph-based skill retriever without training the underlying language model. Reported benchmark results are author-reported and not independently reproduced here.

## Relevant evidence

SE-GoS starts from an existing Graph-of-Skills and updates graph topology, edge weights, and retrieval-facing skill descriptions from historical executions. The authors evaluate three language models on SkillsBench and report consistent gains. In a representative setting, one evolution round increased task reward from 52.4% to 59.4%; they also report roughly one-third lower input-token use than loading the full skill library and a 5.4-point gain over the static graph baseline on a disjoint held-out split. Because the full method changes multiple components together, these results do not isolate the contribution of edge weighting alone.
