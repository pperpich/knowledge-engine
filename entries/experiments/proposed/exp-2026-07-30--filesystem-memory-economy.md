---
{
  "schema_version": 1,
  "id": "experiment:2026-07-30:filesystem-memory-economy",
  "title": "Test whether organized filesystem memory reduces retrieval cost without lowering answer quality",
  "date": "2026-07-30",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "retrieval", "evaluation", "context-engineering", "personal-knowledge-management"],
  "references": ["reference:arxiv:2607.26637"],
  "status": "proposed",
  "hypothesis": "For the same memory corpus and query set, a maintained hierarchical filesystem will reduce median retrieved tokens by at least 40% relative to a chronological flat dump while keeping answer accuracy and citation correctness within 3 percentage points of the better condition.",
  "success_criterion": "Across at least 40 paired queries from four categories, the organized condition uses no more than 60% of the flat condition's median retrieved tokens, achieves at least 80% answer accuracy and 85% citation correctness, and is no more than 3 percentage points below the better condition on either quality metric.",
  "stop_condition": "Stop after 80 paired query evaluations, or earlier after 40 paired queries only if the 95% bootstrap interval for token savings remains above 30% and all absolute-quality guardrails are satisfied.",
  "related": ["brief:ai-knowledge:2026-07-30"]
}
---

# Test whether organized filesystem memory reduces retrieval cost without lowering answer quality

## Why this experiment

Filesystem memory is attractive because it is inspectable, portable, and directly usable by generic agent tools. New research suggests that organization may primarily buy search economy rather than better answers, and that tool configuration can materially affect store shape. This experiment isolates whether organization is worth its maintenance cost in a small practical corpus.

## Minimal procedure

1. Build one frozen memory corpus of at least 200 notes containing facts, updates, decisions, and reusable procedures.
2. Create two stores with identical content: a chronological flat directory and a human-reviewed hierarchical directory with descriptive filenames and index files.
3. Use the same search agent, model, prompt, shell/search tools, token budget, and answer rubric for both stores.
4. Evaluate at least 40 questions across factual recall, changed facts, cross-note synthesis, and procedure retrieval.
5. Run each question against both stores in randomized order and require citations to the source files.
6. Record maintenance effort separately; do not allow post-query reorganization during the evaluation.

## Measurement

Measure answer accuracy, citation correctness, unsupported-claim rate, retrieved tokens, tool calls, latency, and failed-search rate. Use paired per-question comparisons and bootstrap 95% confidence intervals. Report each query category separately.

Definitions:

- **Retrieved tokens:** tokens from file contents returned by search or read tools before answer generation.
- **Correct answer:** meets a predefined factual rubric without a material contradiction or omission.
- **Correct citation:** identifies a file containing sufficient evidence for the associated claim.
- **Organized store:** a human-reviewed hierarchy with stable topical directories, descriptive filenames, and index files.
- **Flat store:** the same notes stored chronologically without topical grouping or indexes.

## Expected effort

Four to six hours for corpus preparation, paired execution, scoring, and analysis, assuming an existing agent harness.

## Stop condition

Stop after 80 paired evaluations. An early stop after 40 is allowed only when the lower bound of the 95% bootstrap interval shows at least 30% token savings and both absolute-quality thresholds are met.
