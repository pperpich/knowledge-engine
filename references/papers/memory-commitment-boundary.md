---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.19564",
  "title": "Remember, Verify, or Ask? Cross-Family Evaluation of Memory Commitment in LLM Agents",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.19564",
  "published_at": "2026-08-20",
  "accessed_at": "2026-08-23",
  "authors": ["Baichuan Li", "Junyi Yao", "Zihao Zheng"],
  "topics": ["memory", "evaluation", "personal-knowledge-management"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.19564", "doi": "10.48550/arXiv.2608.19564"},
  "related": []
}
---

# Remember, Verify, or Ask?

## Annotation

Recent preprint introducing a benchmark for deciding whether interaction-derived information should become durable memory, remain current-context-only, be re-verified, or trigger clarification.

## Relevant evidence

The benchmark contains 140 primary scenarios plus a 70-item contrast set and evaluates both stated action labels and structured tool calls. The authors report that few-shot prompting improves held-out action accuracy from 0.557 to 0.771, while a policy prompt reduces erroneous persistence from 0.243 to 0.100. Clarification remains difficult, and label-to-tool agreement is substantially weaker than stated decision accuracy.
