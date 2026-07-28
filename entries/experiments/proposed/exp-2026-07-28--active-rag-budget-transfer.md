---
{
  "schema_version": 1,
  "id": "experiment:2026-07-28:active-rag-budget-transfer",
  "title": "Test whether an active-RAG retrieval threshold holds its budget out of sample",
  "date": "2026-07-28",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["rag", "retrieval", "evaluation", "context-engineering"],
  "references": ["reference:arxiv:2607.24010"],
  "status": "proposed",
  "hypothesis": "A retrieval threshold calibrated to use evidence on 30% of a development set will miss that target by more than 5 percentage points on a held-out topic unless calibration is performed per topic or with a conservative budget rule.",
  "success_criterion": "A conservative or topic-aware threshold keeps held-out retrieval usage within 5 percentage points of the 30% target, maintains answer accuracy within 2 percentage points of always-retrieve, and reduces average retrieval calls by at least 50% relative to always-retrieve.",
  "stop_condition": "Stop after evaluating at least 120 held-out questions across three topics, or earlier if every tested threshold misses the target by more than 10 percentage points and therefore requires redesign rather than further sampling.",
  "related": ["brief:ai-knowledge:2026-07-28"]
}
---

# Test whether an active-RAG retrieval threshold holds its budget out of sample

## Why this experiment

Active RAG is often evaluated at a nominal retrieval budget, but the realized evidence-use rate can drift when the topic distribution changes. This experiment tests whether a calibrated trigger actually respects its intended operating point while preserving answer quality.

## Minimal procedure

1. Select at least 180 labeled questions across three materially different topics; use 60 for calibration and at least 120 for held-out evaluation.
2. Define **retrieval utility** as the paired change in answer correctness between the same model answering with and without retrieved evidence.
3. Choose one existing trigger score, such as model uncertainty or retriever confidence, and freeze the model, prompt, retriever, corpus, and scoring rubric.
4. Calibrate a global threshold on the development set to target a 30% retrieval rate.
5. Evaluate that threshold on held-out questions, then compare it with a conservative threshold and topic-specific thresholds calibrated only from development data.
6. Include always-retrieve and never-retrieve baselines.

## Measurement

Report realized retrieval rate, deviation from the 30% target, answer accuracy, retrieval-harm rate, average retrieval calls, and estimated trigger-side compute cost. Use paired per-question comparisons and report bootstrap 95% confidence intervals overall and by topic.

Definitions:

- **Retrieval rate:** the percentage of questions for which the policy invokes external retrieval.
- **Retrieval harm:** a question answered correctly without retrieval but incorrectly after retrieval.
- **Budget deviation:** the absolute difference between realized retrieval rate and the 30% target.
- **Always-retrieve quality guardrail:** held-out accuracy of the policy may be no more than 2 percentage points below always-retrieve.

## Expected effort

Four to six hours if question labels, retrieval, and answer evaluation are already scriptable.

## Stop condition

Stop after at least 120 held-out questions. Stop early only when all tested policies miss the budget by more than 10 percentage points with confidence intervals excluding the 5-point target, indicating that the trigger or calibration method needs redesign.
