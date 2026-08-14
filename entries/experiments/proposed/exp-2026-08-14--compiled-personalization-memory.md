---
{
  "schema_version": 1,
  "id": "experiment:2026-08-14:compiled-personalization-memory",
  "title": "Test compiled personalization against retrieval-only memory",
  "date": "2026-08-14",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "personal-knowledge-management", "retrieval", "context-engineering", "evaluation"],
  "references": ["reference:arxiv:2608.08995"],
  "status": "proposed",
  "hypothesis": "For recurring task categories with stable user preferences, a specialist instruction compiled from the same historical examples used by a retrieval baseline will reduce median personalization-context tokens by at least 50% and improve preference-adherence accuracy by at least 10 percentage points, while keeping task correctness within 3 percentage points of baseline and at or above 85%.",
  "success_criterion": "Across 60 paired held-out tasks from three recurring categories, compiled specialists reduce median personalization-context tokens by at least 50%, achieve at least 85% task correctness and 85% preference adherence, improve preference adherence by at least 10 percentage points over retrieval-only memory, and are no more than 3 percentage points below baseline task correctness in any category.",
  "stop_condition": "Stop after 120 condition-task evaluations. Stop early after at least 30 paired tasks if compiled-specialist task correctness or preference adherence is below 75%, or if either trails the retrieval baseline by more than 10 percentage points with the 95% paired bootstrap interval excluding zero.",
  "related": ["brief:ai-knowledge:2026-08-14"]
}
---

# Test compiled personalization against retrieval-only memory

## Why this experiment

The Muscle Memory paper argues that repeated user intent can sometimes be represented more effectively as executable specialist behavior than as retrieved historical text. This experiment isolates that representation choice. It deliberately uses gold task-category routing so trigger quality does not get mixed into the result.

## Minimal procedure

1. Choose three recurring task categories with stable, explicit user preferences, such as issue drafting, technical review, and status-report formatting.
2. For each category, create a training history of at least 20 examples containing both the task input and the user's accepted preference corrections. Keep 20 additional held-out tasks per category for evaluation.
3. **Retrieval baseline:** use a frozen retriever to select the top five training-history examples for each held-out task and place those raw examples in the personalization context.
4. **Compiled treatment:** once per category, use a fixed compiler prompt and model to distill the same training history into one specialist instruction. At inference time, provide that instruction without retrieving raw history.
5. Route each held-out task to its known category in both conditions. Keep generator model, base system prompt, tools, task input, temperature, output budget, and scoring rubric identical.
6. Run both conditions for every held-out task in randomized order. Score outputs against a task-correctness rubric and a separately defined preference-adherence rubric, with the scorer blinded to condition when practical.

## Measurement

Track task correctness, preference adherence, unsupported additions, personalization-context tokens, total input tokens, generation latency, and one-time specialist-construction tokens. Report paired differences with 95% bootstrap confidence intervals overall and by task category. Report the break-even number of runs at which one-time compilation cost is recovered through lower inference-context usage.

Definitions:

- **Compiled specialist:** a static instruction distilled from a category's training history before evaluation; it receives no raw historical examples at inference time.
- **Retrieval-only memory:** the same base agent plus the top five raw historical examples selected by the frozen retriever for the current task.
- **Task correctness:** the response satisfies the held-out task's predefined factual and structural requirements without a material error.
- **Preference adherence:** the response satisfies all stable user-preference requirements specified in the held-out rubric for that category.
- **Personalization-context tokens:** tokens added solely to convey historical preferences: retrieved examples for baseline or the compiled specialist instruction for treatment.

## Expected effort

Four to six hours for corpus selection, preference labeling, specialist compilation, paired execution, scoring, and analysis, assuming an existing agent and evaluation harness.

## Stop condition

Stop after 120 condition-task evaluations. An early quality-failure stop is allowed after at least 30 paired tasks if compiled-specialist correctness or preference adherence is below 75%, or if either trails retrieval by more than 10 percentage points with a paired 95% bootstrap interval excluding zero.
