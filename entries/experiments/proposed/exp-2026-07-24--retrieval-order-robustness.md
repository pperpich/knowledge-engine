---
{
  "schema_version": 1,
  "id": "experiment:2026-07-24:retrieval-order-robustness",
  "title": "Measure retrieval-order robustness on a small knowledge corpus",
  "date": "2026-07-24",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["rag", "retrieval", "evaluation", "context-engineering"],
  "references": ["reference:arxiv:2605.27105"],
  "status": "proposed",
  "hypothesis": "For questions with one human-labeled gold passage among distractors, moving that passage between the beginning, middle, and end of an otherwise identical context will produce at least a 10 percentage-point spread in answer accuracy or citation correctness.",
  "success_criterion": "Across at least 30 paired questions and three passage-order variants, the worst-to-best accuracy and citation-correctness gaps are each below 5 percentage points, while mean accuracy and citation correctness remain at least 80% and no variant is more than 3 percentage points worse than the best variant.",
  "stop_condition": "Stop after 90 evaluated question-variant cases, or earlier if an interim paired analysis after 15 questions shows both ordering gaps below 5 percentage points with no absolute-quality metric below 80%.",
  "related": ["brief:ai-knowledge:2026-07-24"]
}
---

# Measure retrieval-order robustness on a small knowledge corpus

## Why this experiment

Recent reproducibility work suggests that document-position effects depend on topic sampling, model choice, context size, and retrieval quality. This controlled experiment isolates passage order while holding the retrieved evidence set constant.

## Minimal procedure

1. Select at least 30 answerable questions across at least three topics from one stable internal or public corpus.
2. For each question, have a human reviewer identify one gold passage that directly supports the answer and label the remaining passages as distractors or supplementary evidence.
3. Freeze the same passage set for all variants; do not rerun retrieval between variants.
4. Create three variants that place the gold passage at the beginning, middle, or end while preserving the relative order of every other passage.
5. Keep the model, system prompt, question wording, temperature, token budget, and citation instructions fixed.
6. Score answer correctness against a predefined answer key and citation correctness against the human-labeled gold passage. Use the same rubric for every variant and blind the scorer to passage order when practical.

## Measurement

Report paired per-question results for answer correctness, citation correctness, unsupported-claim rate, and response abstention. Report means, worst-to-best gaps, 95% confidence intervals or bootstrap intervals, and results by topic so aggregate scores do not conceal a brittle subset.

Definitions:

- **Gold passage:** the human-labeled passage containing sufficient evidence for the expected answer.
- **Correct answer:** an answer meeting the predefined factual rubric without material contradiction.
- **Correct citation:** a citation that points to the gold passage or another passage containing the claimed evidence.
- **Ordering gap:** the difference between the highest- and lowest-performing passage-position variants on the same metric.

## Expected effort

Three to five hours for corpus selection, human labeling, scripted permutation, evaluation, and paired analysis, assuming an existing retrieval and evaluation harness.

## Stop condition

Stop after 90 evaluated question-variant cases. An early stop after 45 cases is allowed only when both ordering gaps are below 5 percentage points, all absolute-quality metrics remain at or above 80%, and no topic shows a gap above 10 percentage points.
