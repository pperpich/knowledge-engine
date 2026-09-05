---
{
  "schema_version": 1,
  "id": "reference:github:hydrafusion-2026-09-04",
  "title": "Project HydraFusion: Frontier quality via multi-model orchestration",
  "kind": "web",
  "publisher": "GitHub",
  "canonical_url": "https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/",
  "published_at": "2026-09-04",
  "accessed_at": "2026-09-05",
  "authors": ["GitHub Staff"],
  "topics": ["agent-tooling", "developer-tools", "evaluation", "benchmarks"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {},
  "related": []
}
---

# Project HydraFusion: Frontier quality via multi-model orchestration

## Annotation

GitHub’s primary announcement and technical description of the HydraFusion research preview in Copilot CLI, including routing patterns, execution safeguards, cost accounting, and vendor-run offline evaluations.

## Relevant evidence

HydraFusion selects among single, cascade, and critique workflows using models across providers. GitHub documents isolated tool-less critics, bounded execution, fail-safe patch application, and complete workflow-leg accounting. It reports relative quality and estimated-cost results against Claude Opus 5 on TerminalBench 2.1, DeepSWE, and an internal CheckpointBench, while explicitly limiting those results to the evaluated configurations and assumptions.