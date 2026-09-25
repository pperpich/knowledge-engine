---
{
  "schema_version": 1,
  "id": "experiment:2026-09-25:feedback-guided-iterative-retrieval",
  "title": "Feedback-guided iterative retrieval",
  "date": "2026-09-25",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["retrieval", "reranking", "evaluation", "context-engineering"],
  "references": ["reference:arxiv:2609.28980"],
  "status": "proposed",
  "hypothesis": "Two feedback-guided retrieval rounds will improve evidence Recall@20 by at least 8 percentage points and grounded correctness by at least 4 points versus one pass under the same final context budget.",
  "success_criterion": "Across 120 paired questions, Recall@20 improves by at least 8 points and grounded correctness by at least 4 points, both paired-bootstrap 95% confidence intervals exclude 0, treatment correctness is at least 80%, citation support at least 90%, and no topic family loses more than 2 correctness points.",
  "stop_condition": "Stop if the two arms differ in corpus, initial candidates, reader, final context budget, answer prompt, or scoring; if scoring labels enter retrieval feedback; or if fewer than 120 paired questions remain.",
  "related": ["brief:ai-knowledge:2026-09-25"]
}
---

# Feedback-guided iterative retrieval

## Why this experiment

Seek reports that iterative relevance feedback can recover evidence missed by a single retrieval pass. This experiment tests whether that translates into better grounded answers. [Primary source](https://arxiv.org/abs/2609.28980)

## Minimal procedure

Use 120 fixed questions across four topic families. Baseline runs one retrieval pass, a common reranker, and a reader over the top five passages. Treatment starts from the identical first-pass candidates, scores their relevance on a fixed 0-3 rubric, generates one pseudo-passage describing missing evidence, performs one additional retrieval pass, unions and deduplicates candidates, then uses the same reranker and reader with the same top-five and token budget. Keep all models, prompts, index versions, and scoring fixed. Score paired outcomes and run 10,000 paired bootstrap resamples.

Definitions: **baseline** is the one-pass pipeline. **feedback** is first-pass retrieved text plus relevance scores, excluding scoring labels. **production order** is the preregistered question order with no cross-question state. **grounded correctness** requires a correct answer whose required factual elements are supported by cited evidence. **citation support** is the fraction of citations that directly support their associated claim. **strongest evidence** is the highest-scoring passage under the common reranker.

## Measurement

Measure paired evidence Recall@20, grounded correctness, citation support, unsupported-claim rate, latency, model calls, and retrieval-stage tokens. Report aggregate and per-topic results with paired 95% confidence intervals. The 80% correctness and 90% citation-support thresholds are absolute-quality guardrails.

## Expected effort

About 4-6 engineering hours with an existing retrieval/evaluation harness.

## Stop condition

Use the front-matter stop condition. Also stop if first-pass candidates differ between arms, because the comparison would no longer isolate iterative retrieval.
