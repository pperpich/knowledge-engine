---
{
  "schema_version": 1,
  "id": "experiment:2026-09-11:trace-weighted-skill-reranking",
  "title": "Trace-Weighted Skill Reranking",
  "date": "2026-09-11",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "evaluation", "knowledge-graphs", "retrieval"],
  "references": ["reference:paper:se-gos:2609.08228"],
  "status": "proposed",
  "hypothesis": "On held-out tasks whose required skills are present in a fixed library, development-only execution-success weights on existing graph edges will improve end-task success by at least 0.05 and required-skill Recall@5 by at least 0.08 versus the same static graph, without increasing the selected-skill budget or mean input tokens by more than 5%.",
  "success_criterion": "Across 100 paired held-out tasks, treatment must improve end-task success by at least 0.05 with the lower bound of a 95% paired-bootstrap confidence interval above zero, improve required-skill Recall@5 by at least 0.08, achieve absolute task success of at least 0.75 and Recall@5 of at least 0.85, lose no more than 0.05 task success in any preregistered topic subgroup, and keep mean input tokens at or below 1.05 times baseline.",
  "stop_condition": "Stop and mark the experiment invalid if development/held-out task leakage is found, the skill library, graph topology, descriptions, model, prompt, top-5 budget, or evaluator differs between arms, fewer than 100 eligible held-out tasks remain after preregistered exclusions, or scoring cannot be completed blind to arm. Otherwise stop after 100 eligible held-out tasks have been scored.",
  "related": ["brief:ai-knowledge:2026-09-11"]
}
---

# Trace-Weighted Skill Reranking

## Why this experiment

SE-GoS reports that a skill-retrieval graph can improve from historical execution traces, but its full method changes graph topology, edge weights, and skill descriptions together. This experiment tests a narrower question: **does execution-derived edge weighting improve retrieval when everything else stays fixed?** [Research motivation: arXiv](https://arxiv.org/abs/2609.08228)

Definitions used throughout:

- **Skill library:** the fixed set of skill documents available to both arms before development traces are collected.
- **Required skill:** a human-preregistered skill needed to complete the task under the evaluation rubric; the required set is hidden from the retriever and agent.
- **Eligible held-out task:** a preregistered task for which every required skill exists in the fixed library and the task was not used to create or tune development traces, edge weights, prompts, or scoring rules.
- **Baseline:** retrieval using the original graph, original edge scores, original skill descriptions, and the fixed top-5 budget.
- **Treatment:** the identical graph and descriptions, with only existing edge scores multiplied by development-only execution-success weights.
- **End-task success:** a binary pass/fail score against a preregistered task-specific rubric, adjudicated blind to experimental arm.
- **Required-skill Recall@5:** the fraction of the preregistered required-skill set present among the five selected skills.
- **Input tokens:** model-visible tokens for instructions plus selected skill content, measured from the actual request payload before generation.

## Minimal procedure

1. Freeze a skill library, dependency graph, original edge scores, model/version, system and task prompts, top-5 skill budget, generation settings, and scoring code.
2. Create 240 tasks before running the experiment: 120 development tasks and 120 held-out candidates, stratified across at least four task families. Preregister each task's required-skill set and evaluation rubric. Do not reuse near-duplicate tasks across splits.
3. Before any held-out arm is run, apply the preregistered eligibility rules to the 120 held-out candidates and select the first 100 eligible tasks in a fixed preregistered order. If fewer than 100 remain, stop and mark the experiment invalid.
4. Run the 120 development tasks once using the baseline retriever. For every graph edge traversed during retrieval, record whether the resulting task passed its end-task rubric.
5. For each traversed edge, compute `p = (successful_uses + 1) / (total_uses + 2)`. Set its treatment multiplier to `1 + 0.5 * (2p - 1)`. Untouched edges receive multiplier 1. Freeze all multipliers before held-out evaluation.
6. For each of the 100 selected held-out tasks, run baseline and treatment with identical inputs except for the edge multiplier. Each arm returns exactly five skills. Randomize arm execution order per task.
7. Score both outputs blind to arm for end-task success. Compute required-skill Recall@5 from the preregistered labels and record input-token counts from the requests.
8. Report paired task-level differences, 10,000 paired bootstrap resamples for the task-success delta, and per-topic results. Do not select or exclude topics after seeing outcomes.

## Measurement

Primary outcome: paired difference in end-task success rate.

Secondary outcomes: paired required-skill Recall@5, input-token count, and per-topic task success. Report the baseline and treatment absolute values as well as deltas.

The experiment passes only if all front-matter success criteria hold simultaneously. The absolute task-success and Recall@5 floors prevent a nominal improvement from passing when both systems perform poorly. The per-topic floor prevents a global mean from hiding a material regression in one task family.

## Expected effort

Approximately 120 development task executions and 200 held-out arm executions, plus task/rubric labeling and blind adjudication. With an existing skill graph and automated runner, expected engineering effort is roughly one working day; human labeling and review are likely the larger cost.

## Stop condition

Use the front-matter stop condition exactly. In addition, if fewer than 30 development traversals touch any edge family that dominates held-out retrieval, report that sparsity explicitly rather than increasing the multiplier strength after seeing held-out results.
