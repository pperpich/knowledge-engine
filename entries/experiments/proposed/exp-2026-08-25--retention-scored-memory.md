---
{
  "schema_version": 1,
  "id": "experiment:2026-08-25:retention-scored-memory",
  "title": "Test retention-scored memory against a linear history baseline",
  "date": "2026-08-25",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "evaluation", "context-engineering"],
  "references": ["reference:arxiv:2608.20631"],
  "status": "proposed",
  "hypothesis": "Under an identical context-token budget, a retention-scored hierarchical memory will improve task success by at least 8 percentage points and reduce irrelevant-memory tokens by at least 20% relative to a recency-ordered linear memory, without increasing unsupported-claim rate by more than 2 percentage points.",
  "success_criterion": "Across at least 40 paired long-horizon tasks, retention-scored memory improves mean task success by at least 8 percentage points, reduces irrelevant-memory tokens by at least 20%, maintains absolute task success at or above 70%, and keeps unsupported-claim rate at or below 5% and no more than 2 percentage points above the linear baseline.",
  "stop_condition": "Stop after 80 paired task runs, or after an interim analysis at 40 paired tasks if the 95% bootstrap interval for task-success difference excludes the 8-point target in the unfavorable direction and token reduction is below 10%.",
  "related": ["brief:ai-knowledge:2026-08-25"]
}
---

# Test retention-scored memory against a linear history baseline

## Why this experiment

Long-running agents accumulate more history than can remain active in context. The question is whether a simple utility-aware retention policy improves useful evidence density compared with keeping the most recent history under the same budget.

## Minimal procedure

1. Select at least 40 multi-step tasks whose later steps depend on facts or decisions introduced earlier in the trajectory.
2. Generate one fixed history per task containing required evidence, completed subtasks, low-value chatter, and at least one stale or misleading item.
3. Run two memory conditions with the same model, prompt, retrieval method, and context-token budget:
   - **Linear baseline:** retain memory in recency order until the budget is full.
   - **Retention-scored:** organize memory into task/subtask/action nodes and rank active items using a predefined score based on task relevance, successful reuse, completion state, and decay.
4. Freeze the scoring formula before evaluation and do not tune it per task.
5. Use paired runs with identical questions and deterministic settings where supported.
6. Score final task success against a predefined answer/action key and independently label whether each included memory item was required, useful, irrelevant, stale, or misleading.

## Measurement

Track paired task success, required-evidence recall, irrelevant-memory token share, stale/misleading-memory inclusion, unsupported-claim rate, and total prompt tokens. Report means, paired differences, 95% bootstrap confidence intervals, and per-task-family results.

Definitions:

- **Required evidence:** a memory item without which the expected answer or action cannot be derived from the current task input alone.
- **Irrelevant-memory tokens:** tokens from memory items labeled neither required nor useful for the evaluated step.
- **Task success:** completion of the predefined factual or executable success condition.
- **Unsupported claim:** a material factual assertion not supported by current input or retained memory.

## Expected effort

Four to six hours for corpus construction, fixed retention scoring, scripted paired runs, labeling, and analysis, assuming an existing agent evaluation harness.

## Stop condition

Stop after 80 paired task runs. An interim stop after 40 paired tasks is allowed only if the confidence interval makes the target improvement implausible and the retention-scored condition also fails to reduce irrelevant-memory tokens by at least 10%.
