---
{
  "schema_version": 1,
  "id": "experiment:2026-09-23:retrieval-feedback-reconsolidation",
  "title": "Retrieval-feedback reconsolidation",
  "date": "2026-09-23",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "retrieval", "evaluation"],
  "references": ["reference:arxiv:2609.16053"],
  "status": "proposed",
  "hypothesis": "On repeated-use knowledge tasks, updating only memory-graph relationship weights from prior retrieval traces will improve later grounded answer correctness by at least 4 percentage points versus an immutable graph under the same retrieval and context budgets.",
  "success_criterion": "Across 120 paired evaluation questions, treatment minus baseline grounded correctness is at least +4 percentage points and the 95% paired-bootstrap confidence interval excludes 0; treatment grounded correctness is at least 82%, citation support at least 90%, unsupported factual-clause rate no worse than baseline by more than 1 point, and no preregistered topic family regresses by more than 2 points.",
  "stop_condition": "Stop and invalidate the run if either arm changes documents, embeddings, candidate generation, reader model/version, prompts, top-k, context budget, or scoring; if evaluation labels influence reconsolidation; if fewer than 120 eligible paired questions remain; or if trace updates cannot be replayed deterministically from logged retrieval events.",
  "related": ["brief:ai-knowledge:2026-09-23"]
}
---

# Retrieval-feedback reconsolidation

## Why this experiment

REALM reports that retrieval-driven reconsolidation can improve long-term-memory performance, but its full system also changes memory organization and adaptive graph retrieval. This experiment isolates one smaller builder-relevant question: can retrieval traces improve future retrieval when the underlying knowledge and retrieval machinery stay fixed? [Primary source](https://arxiv.org/abs/2609.16053)

## Minimal procedure

1. Build one source-linked memory corpus containing at least 60 multi-session histories across four preregistered topic families. Create one identical initial graph for both arms. Nodes, source text, embeddings, initial edges, and initial edge weights are frozen before evaluation.
2. Prepare 240 questions in chronological pairs: an **exposure question** followed later by a distinct **evaluation question** that requires overlapping evidence. Gold answers and gold supporting sources are hidden from both arms until scoring. Fix 120 eligible pairs before either arm generates answers.
3. **Baseline:** answer exposure questions normally and leave the graph immutable. **Treatment:** after each exposure retrieval, update only existing relationship weights using a fixed rule based on retrieval traces: strengthen an edge when its endpoint records are both present in the final retrieved evidence set; decay untouched eligible edges by a fixed preregistered factor. Do not use answer correctness, gold sources, grader output, or generated answer text in updates.
4. After all exposure questions, answer the 120 evaluation questions with both arms. Freeze model/version, system and user prompts, embeddings, candidate generator, top-k, final context-token budget, citation format, and scoring code. The **production order** is the preregistered chronological order of exposure events followed by evaluation events; no evaluation query may affect treatment state before its own answer is recorded.
5. Score paired outcomes blindly and report aggregate plus per-topic results. Use 10,000 paired bootstrap resamples for a 95% confidence interval on the correctness difference.

Definitions: **baseline** means the immutable initial graph. **Retrieval trace** means the ordered record IDs returned and the subset admitted to final reader context, with no outcome labels. **Grounded correctness** means the final answer satisfies the preregistered answer key and every required factual element is supported by cited source text. **Citation support** is the fraction of factual citations whose cited source directly supports the associated claim. **Unsupported factual-clause rate** is the fraction of externally checkable factual clauses without supporting retrieved evidence. **Eligible pair** means the frozen candidate generator can retrieve at least one gold-support record within its top-20 candidates for the evaluation question in both arms before graph-weight reranking.

## Measurement

Primary metric: paired grounded-correctness difference on the 120 evaluation questions.

Secondary metrics: citation support, Recall@5 of gold-support records, unsupported factual-clause rate, retrieval latency, context tokens, and per-topic correctness. Report the mean paired difference and 95% paired-bootstrap interval. The treatment passes only if the front-matter success criterion and all absolute-quality guardrails are satisfied; uniformly poor performance cannot pass on relative improvement alone.

## Expected effort

About 4-6 engineering hours if a replayable retrieval/evaluation harness already exists: roughly 2 hours for deterministic trace-based weight updates, 1 hour for dataset/pair validation, and 1-3 hours for paired execution and analysis.

## Stop condition

Use the front-matter stop condition. Also stop for investigation if more than 1% of treatment updates cannot be reproduced exactly from the persisted trace log, because that makes the causal comparison non-auditable.