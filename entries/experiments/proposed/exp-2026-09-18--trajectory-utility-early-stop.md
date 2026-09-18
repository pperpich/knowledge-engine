---
{
  "schema_version": 1,
  "id": "experiment:2026-09-18:trajectory-utility-early-stop",
  "title": "Trajectory-utility early stopping for agentic retrieval",
  "date": "2026-09-18",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["evaluation", "rag", "retrieval"],
  "references": ["reference:arxiv:2609.16453"],
  "status": "proposed",
  "hypothesis": "On eligible multi-step knowledge questions, a conservative evidence-sufficiency gate can reduce mean retrieval/reasoning iterations by at least 10% versus a fixed production-order budget without lowering paired grounded-correctness by more than 2 percentage points.",
  "success_criterion": "Across 120 preregistered paired questions, treatment reduces mean iterations by >=10%; the 95% paired-bootstrap CI lower bound for iteration reduction is >0; grounded-correctness is >=80% in both arms and treatment-minus-baseline grounded-correctness is >=-2 percentage points; citation support is >=90% in treatment; and no preregistered topic family regresses in grounded-correctness by >5 percentage points.",
  "stop_condition": "Stop and invalidate the comparison if fewer than 120 eligible paired questions remain, retrieval/model/prompt/corpus/tool versions differ between arms, the gate uses gold answers or held-out outcome labels, or treatment grounded-correctness falls below 80% or citation support below 90% at the planned evaluation.",
  "related": ["brief:ai-knowledge:2026-09-18"]
}
---

# Trajectory-utility early stopping for agentic retrieval

## Why this experiment

The cited preprint reports that intermediate answer quality can plateau before an agent's natural stopping point. This experiment tests a narrower production question: can a conservative, evidence-based stop gate save retrieval/reasoning work without degrading grounded answers?

Definitions: **baseline** is the current fixed maximum iteration policy executed in its normal production order. **Eligible** means the baseline retrieves all adjudicated gold-support evidence within its allowed budget, so the test measures stopping rather than upstream retrieval failure. **Grounded-correctness** requires the answer to satisfy the adjudicated answer key and every material factual clause to be supported by a cited retrieved source. **Citation support** is the fraction of material factual clauses whose cited source entails the clause. **Evidence sufficiency** is a gate score computed only from the current trajectory's retrieved evidence, draft answer state, and non-gold development-trained features.

## Minimal procedure

1. Freeze corpus snapshot, retriever, reader model/version, prompts, tools, maximum iteration budget, citation format, token limits, and scoring rubric.
2. Use a disjoint development set to define and freeze one evidence-sufficiency gate and threshold. Do not tune on held-out outcomes.
3. Preregister 120 eligible held-out questions, stratified across at least four knowledge-query families with at least 20 questions per family.
4. Run the baseline to its fixed budget/natural production stop and treatment with the identical trajectory until the frozen gate stops it. Cache identical retrieval results so treatment cannot benefit from different upstream retrieval.
5. Blind answer-quality adjudication to arm. Report paired results overall and per family. Use 10,000 paired bootstrap resamples for 95% confidence intervals on iteration reduction and grounded-correctness difference.

## Measurement

Primary efficiency metric: mean retrieval/reasoning iterations per question. Primary quality metric: paired grounded-correctness. Secondary metrics: citation support, unsupported factual-clause rate, input/output tokens, latency, and stop iteration. Report the fraction of treatment stops that occur before the baseline's final useful evidence arrival.

The experiment passes only if all front-matter success thresholds hold. This prevents a uniformly weak system from passing merely because it stops early.

## Expected effort

About one engineering day to instrument/freeze the gate and evaluation harness, plus one half-day for blinded adjudication and paired analysis if the 120-question set already exists.

## Stop condition

Use the front-matter stop condition. Also stop deployment consideration if savings are concentrated in one topic family while another exceeds the preregistered regression limit; investigate before retesting.
