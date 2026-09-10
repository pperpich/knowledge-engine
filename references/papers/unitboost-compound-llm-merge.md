---
{
  "schema_version": 1,
  "id": "reference:paper:unitboost:2609.09815",
  "title": "UnitBoost: Managing Compound LLM Systems with a Merge Operator, Not a Model",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2609.09815",
  "published_at": "2026-09-09",
  "accessed_at": "2026-09-10",
  "authors": ["Xing Zhang", "Guanghui Wang", "Yanwei Cui", "Mengdie Flora Wang", "Peiyang He"],
  "topics": ["context-engineering", "evaluation", "provenance"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {"arxiv": "2609.09815"},
  "related": []
}
---

# UnitBoost: Managing Compound LLM Systems with a Merge Operator, Not a Model

## Annotation

September 9, 2026 arXiv preprint proposing a non-generative merge operator for compound LLM systems. The evidence below is author-reported and has not been independently reproduced here.

## Relevant evidence

UnitBoost maps worker outputs into task-defined units, selects unit values with a constrained argmax, preserves unit provenance, and exposes unsupported units as residual work for later rounds. The authors report improvements over complete-candidate selection and generative managers on three held-out benchmarks, including a FanOutQA cell-F1 increase from 0.4778 to 0.5524 with residual-directed rounds. They also identify limits when outputs are indivisible, unit identity is unavailable, or cross-unit coupling is substantial.