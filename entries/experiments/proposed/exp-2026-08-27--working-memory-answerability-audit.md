---
{
  "schema_version": 1,
  "id": "experiment:2026-08-27:working-memory-answerability-audit",
  "title": "Audit whether agent working memory remains answerable",
  "date": "2026-08-27",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "evaluation", "rag", "provenance"],
  "references": ["reference:arxiv:2608.25618"],
  "status": "proposed",
  "hypothesis": "For long-document questions that the current agent answers correctly, at least 15% of terminal working-memory records will fail a memory-only answerability test, revealing evidence loss that final-answer accuracy alone does not detect.",
  "success_criterion": "Across at least 40 correctly answered questions spanning at least four document/topic groups, memory-only answerability is at least 90%, final-answer correctness remains at least 80% on the full evaluation set, and unsupported-claim rate remains below 5%; report a paired 95% bootstrap interval for the memory-only answerability rate and subgroup rates by topic.",
  "stop_condition": "Stop after 60 total questions or after obtaining 40 correctly answered trajectories eligible for the memory-only audit, whichever comes first. Stop early after 20 eligible trajectories only if memory-only answerability is below 70%, because the failure mode is already large enough to justify remediation work.",
  "related": ["brief:ai-knowledge:2026-08-27"]
}
---

# Audit whether agent working memory remains answerable

## Why this experiment

Final-answer accuracy can hide weak intermediate memory. An agent may inspect the right evidence and produce a correct answer while leaving behind notes too vague, incomplete, or poorly attributed to support later reasoning, handoffs, retries, or audit.

This experiment measures that hidden failure mode without changing the model, retriever, prompts, or memory-writing policy.

## Minimal procedure

1. Select 60 answerable long-document questions across at least four document or topic groups, with a predefined answer key and evidence pages/passages.
2. Run the current agent once per question with its normal retrieval and working-memory behavior. Save the final answer, terminal working memory, retrieved evidence, and citations.
3. Score final-answer correctness using the predefined rubric.
4. For each correctly answered trajectory, give an independent evaluator only the original question and terminal working memory — no source document, retrieved pages, final answer, or hidden trajectory.
5. Ask the evaluator to answer the question and cite the specific memory statements supporting the answer.
6. Score memory-only answerability against the same answer key, plus whether cited memory statements actually support the answer.

## Measurement

- **Eligible trajectory:** a run whose original final answer meets the predefined correctness rubric.
- **Memory-only answerability:** the independent evaluator can produce a correct answer using only the question and terminal working memory.
- **Memory evidence support:** the evaluator identifies memory statements that contain sufficient evidence for the answer rather than merely a conclusion.
- **Unsupported claim:** a material factual claim in either the final answer or memory-only answer that is not supported by the retrieved evidence or terminal memory available to that scorer.

Report final-answer correctness across all questions, memory-only answerability across eligible trajectories, memory evidence support, unsupported-claim rate, subgroup rates by document/topic group, and paired 95% bootstrap intervals where applicable.

## Expected effort

Three to five hours for a scripted run, evaluator pass, and paired analysis if the current pipeline already logs terminal working memory and retrieved evidence.

## Stop condition

Stop after 60 questions or 40 eligible correctly answered trajectories. An early stop after 20 eligible trajectories is allowed only if memory-only answerability is below 70%, which is already a large enough gap to justify improving memory-writing behavior before expanding the benchmark.
