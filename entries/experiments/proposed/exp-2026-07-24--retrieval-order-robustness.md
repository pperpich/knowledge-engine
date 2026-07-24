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
  "hypothesis": "For questions with one clearly relevant passage among distractors, answer accuracy will vary by at least 10 percentage points across passage-order permutations unless the pipeline reranks and places the strongest evidence first.",
  "success_criterion": "Across at least 30 questions and three order permutations, evidence-first ordering or reranking reduces the worst-to-best accuracy gap below 5 percentage points without increasing median context length by more than 10%.",
  "stop_condition": "Stop after 90 evaluated question-permutation cases, or earlier if the baseline gap is below 5 percentage points and therefore too small to justify further optimization.",
  "related": ["brief:ai-knowledge:2026-07-24"]
}
---

# Measure retrieval-order robustness on a small knowledge corpus

## Why this experiment

Recent reproducibility work suggests that document position effects depend heavily on topic sampling, model choice, context size, and retrieval quality. A small controlled test can reveal whether the current knowledge-system pipeline is sensitive enough to justify reranking or evidence-ordering work.

## Minimal procedure

1. Select 30 answerable questions from one stable internal or public corpus.
2. For each question, retrieve the same top passages once and freeze that set.
3. Evaluate three variants: strongest evidence first, strongest evidence in the middle, and the current production order.
4. Keep model, prompt, temperature, and token budget fixed.
5. Score exact or rubric-based answer correctness and citation support.

## Measurement

Track answer accuracy, citation correctness, unsupported-claim rate, median input tokens, and the accuracy spread across order variants.

## Expected effort

Two to four hours for a scripted first pass, assuming an existing retrieval pipeline and evaluation harness.

## Stop condition

Stop after 90 evaluated cases, or earlier if ordering changes accuracy by less than 5 percentage points and citation quality remains stable.
