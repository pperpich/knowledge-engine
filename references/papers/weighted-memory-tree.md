---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.20631",
  "title": "Weighted Memory Tree: Remembering What Matters for Long-Horizon LLM Agents",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.20631",
  "published_at": "2026-08-21",
  "accessed_at": "2026-08-25",
  "authors": ["Quang Dao", "Purvi Kathalkar", "Kenneth Eaton"],
  "topics": ["memory", "context-engineering", "evaluation"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.20631", "doi": "10.48550/arXiv.2608.20631"},
  "related": []
}
---

# Weighted Memory Tree: Remembering What Matters for Long-Horizon LLM Agents

## Annotation

Recent preprint proposing hierarchical, retention-scored memory for long-horizon agents.

## Relevant evidence

The authors organize task history into task, subtask, and action nodes with event-driven score updates and decay. On GAIA-Text they report an average 9.97 percentage-point accuracy improvement over linear memory and a 32.8% reduction in prompt-token use, plus improved robustness in memory-poisoning experiments. These are author-reported preprint results.
