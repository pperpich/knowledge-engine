---
{
  "schema_version": 1,
  "id": "experiment:2026-09-08:memory-upgrade-compatibility-gate",
  "title": "Memory Upgrade Compatibility Gate",
  "date": "2026-09-08",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "provenance", "evaluation"],
  "references": ["reference:arxiv:2609.05339"],
  "status": "proposed",
  "hypothesis": "When a new reader model inherits memory written by an old model, a source-linked fixed-schema store will have no more than 5 percentage points of migration loss and at least 5 percentage points less migration loss than model-written free-form notes.",
  "success_criterion": "Across 60 paired histories, the structured inherited-store condition must achieve at least 80% absolute answer correctness and 90% citation support; its fresh-minus-inherited correctness loss must be <=5 percentage points; and the paired 95% bootstrap confidence interval for (notes migration loss minus structured migration loss) must have a lower bound >=5 percentage points.",
  "stop_condition": "Stop and do not interpret the result if randomized answer codes leak into prompts or training data, more than 5% of runs fail to parse or persist, either fresh-store baseline is below 80% correctness, the reader/prompt/context budget differs between paired conditions, or all 60 histories have completed.",
  "related": ["brief:ai-knowledge:2026-09-08"]
}
---

# Memory Upgrade Compatibility Gate

## Why this experiment

The memory-portability study separates memory writing from memory reading and shows that migration direction can matter. This experiment tests the narrower production question: **does a source-linked fixed schema reduce reader-model upgrade loss relative to free-form model-written notes?** [Goyal & Ray](https://arxiv.org/abs/2609.05339)

## Minimal procedure

1. Build **60 synthetic or consented, de-identified histories** representative of the target workload. Each history should contain at least 20 durable facts, including updates, contradictions, aliases, and multi-step relations. Generate six answerable questions per history (360 paired questions total) with a gold minimal source-event set for each question.
2. Randomize answer-bearing entity/value codes that cannot be answered from model pretraining. Keep the history and question set identical across conditions.
3. With old writer model **A**, build two stores from every history in production order:
   - **Structured:** fixed fields for subject, predicate, value, valid-from/valid-to or supersession, and source-event ID.
   - **Notes:** free-form natural-language memory under a byte/token budget matched to the structured condition as closely as practical.
4. With new reader model **B**, evaluate both inherited A-written stores. Then rebuild each store from the same history with B as writer and evaluate B again. B, its system prompt, retrieval/read procedure within each memory format, final context budget, temperature, and answer/citation format must remain fixed between inherited and fresh comparisons.
5. Score every condition blindly and retain per-history results. Run 10,000 paired bootstrap resamples over histories and report 95% confidence intervals plus per-question-type results.

## Measurement

**Baseline** means B reading a B-written fresh store in the same memory format. **Inherited** means B reading the A-written store. **Migration loss** is baseline correctness minus inherited correctness, in percentage points; positive values indicate degradation after the writer-model swap.

**Answer correctness** is exact match for randomized codes or a deterministic task-specific rubric fixed before evaluation. **Gold minimal source-event set** is the smallest preregistered set of history events sufficient to entail the answer. **Citation support** is the fraction of answers whose cited source-event IDs are all in, or logically entail the same facts as, that gold set; an uncited answer requiring memory counts as unsupported.

Primary comparison: `notes migration loss - structured migration loss`, paired by history. Report the mean, 95% bootstrap interval, absolute correctness, citation support, and results separately for direct facts, updates/contradictions, aliases, and multi-step questions.

Success requires all three:
- structured inherited correctness >=80% and citation support >=90%;
- structured migration loss <=5 percentage points;
- the lower bound of the paired 95% bootstrap interval for the primary comparison is >=5 percentage points.

This absolute-quality guardrail prevents the experiment from passing merely because both memory formats fail similarly badly.

## Expected effort

About 4–6 engineering hours to prepare the harness and scoring if representative histories and two model endpoints already exist, plus model runtime for 1,440 answer evaluations and memory construction.

## Stop condition

Stop after all 60 histories complete, or earlier without drawing a portability conclusion if answer codes leak, more than 5% of runs fail to parse or persist, either fresh-store baseline falls below 80% correctness, or any paired condition changes reader model, prompt, context budget, scoring, or the underlying history. If the two formats cannot be given comparable memory budgets, record the mismatch and treat the result as an architecture comparison rather than a format-isolation claim.
