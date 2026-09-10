---
{
  "schema_version": 1,
  "id": "experiment:2026-09-10:unit-provenance-merge",
  "title": "Unit-Provenance Merge for Multi-Fact Synthesis",
  "date": "2026-09-10",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["context-engineering", "evaluation", "provenance"],
  "references": ["reference:paper:unitboost:2609.09815"],
  "status": "proposed",
  "hypothesis": "For multi-fact synthesis with a fixed retrieved evidence set and fixed candidate answers, selecting evidence-supported answer units independently will improve paired task score by at least 0.05 over selecting the strongest complete candidate, without reducing absolute correctness below 0.80 or citation support below 0.90.",
  "success_criterion": "Across 60 paired questions, treatment must improve mean task score by at least 0.05 versus baseline with the lower bound of a paired 95% bootstrap confidence interval above 0; treatment correctness must be at least 0.80, citation support at least 0.90, and no predeclared topic group may lose more than 0.03 mean task score.",
  "stop_condition": "Stop after the 20-question pilot if more than 10% of questions cannot be represented by the predefined unit map without cross-unit dependencies, if fewer than 90% of candidate factual units can be mapped reproducibly, or if treatment processing cost exceeds 2x baseline before answer generation; otherwise complete all 60 paired questions and stop after the preregistered analysis.",
  "related": ["brief:ai-knowledge:2026-09-10"]
}
---

# Unit-Provenance Merge for Multi-Fact Synthesis

## Why this experiment

The UnitBoost preprint proposes replacing a generative manager with a task-defined unit map and constrained unit-level selection that retains provenance and exposes unsupported residuals. The paper reports gains on its evaluated compound-system tasks, but the narrower question for a knowledge system is whether unit-level selection improves evidence-backed synthesis when retrieval and candidate generation are held fixed. [Research motivation: arXiv](https://arxiv.org/abs/2609.09815)

## Minimal procedure

1. Build a fixed set of 60 multi-fact questions, stratified before scoring into three 20-question groups: AI-builder updates, knowledge-system research, and repository/policy synthesis. Each question must have 3 to 6 predefined answer units and an adjudicated answer key with source IDs.
2. For every question, freeze the retrieved evidence set first. Generate exactly three candidate answers from the same model, prompt, temperature, tool access, and evidence. Randomize candidate production order once, record it, and reuse the cached candidates in both arms.
3. Define an **answer unit** as one independently judgeable factual slot in the adjudicated key. Exclude a question at pilot time if two or more required slots are semantically coupled such that selecting one changes the correctness of another.
4. Score every candidate unit against the frozen evidence using one fixed rubric. **Evidence-support score** is the mean of correctness support and citation support for that unit, each scored 0 or 1 by a blinded evaluator. Ties are broken by the recorded production order, earliest first.
5. **Baseline:** choose one complete candidate, defined as the candidate with the highest mean evidence-support score across all required units. This is the "strongest complete candidate." Do not repair or merge it.
6. **Treatment:** for each predefined answer unit, choose the candidate value with the highest evidence-support score and retain that value's source ID. If no candidate value receives direct evidence support, emit an explicit `unsupported` value rather than generating a replacement. Concatenate units in the predefined unit-map order.
7. Blind final outputs to arm and score them against the same adjudicated answer key. Preserve per-question and per-topic results for paired analysis.

## Measurement

**Correctness** is the fraction of required answer units whose selected value matches the adjudicated key, using exact match when the unit is categorical/numeric and a predeclared semantic-match rubric for textual units. `unsupported` is incorrect unless the adjudicated key itself marks the unit unknowable from the frozen evidence.

**Citation support** is the fraction of non-`unsupported` factual units whose retained source ID directly supports that unit according to the adjudicated evidence map. A source that is merely topically related scores 0.

**Task score** is `0.7 * correctness + 0.3 * citation_support`, computed per question before averaging. Report baseline and treatment means, paired deltas, a paired 95% bootstrap confidence interval over questions, and results separately for all three predeclared topic groups.

The experiment passes only if all of the following hold: mean paired task-score delta is at least +0.05; the 95% bootstrap lower bound is above 0; treatment correctness is at least 0.80; treatment citation support is at least 0.90; and no topic group's treatment-minus-baseline mean task score is below -0.03. These absolute guardrails prevent uniformly poor outputs from passing on relative improvement alone.

## Expected effort

Approximately 4 to 6 hours if the 60 questions, frozen evidence, and candidate-generation harness already exist; otherwise one working day to construct the adjudicated unit maps and evidence keys. The experiment does not require changing the retriever or production model.

## Stop condition

Run a 20-question pilot before completing the full set. Stop and redesign if more than 10% of pilot questions violate the independence assumption, if fewer than 90% of candidate factual units can be mapped to predefined units reproducibly, or if treatment-side merge/scoring cost before answer generation exceeds 2x the baseline selection cost. If none of those conditions fires, complete all 60 questions and stop after the preregistered paired and per-topic analysis.