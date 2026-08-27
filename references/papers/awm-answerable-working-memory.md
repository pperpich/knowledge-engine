---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.25618",
  "title": "AWM: Answerable Working Memory for Long-Document VQA Agents",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.25618",
  "published_at": "2026-08-26",
  "accessed_at": "2026-08-27",
  "authors": ["Dongzhuoran Zhou", "Yuqicheng Zhu", "Yule Liu", "Zhen Yang", "Rui Lu", "Yuxiao Dong", "Jie Tang", "Evgeny Kharlamov"],
  "topics": ["memory", "evaluation", "rag", "retrieval", "provenance"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.25618", "doi": "10.48550/arXiv.2608.25618"},
  "related": []
}
---

# AWM: Answerable Working Memory for Long-Document VQA Agents

## Annotation

Recent preprint proposing memory-only answerability as a diagnostic for long-document agents: can an independent reader answer the original question using only the agent's terminal working memory?

## Relevant evidence

The authors report that on MMLongBench-Doc, even with gold evidence pages supplied, 42.5% of correct-answer trajectories leave terminal working memory that is not independently answerable. Their AWM-GRPO training objective rewards answer-supporting working memory while retaining final-answer priority and reports gains on MMLongBench-Doc and LongDocURL. Results are author-reported and specific to the evaluated long-document VQA setting.
