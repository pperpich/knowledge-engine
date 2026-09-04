---
{
  "schema_version": 1,
  "id": "experiment:2026-09-04:rule-guided-memory-retrieval",
  "title": "Test rule-guided memory retrieval under a fixed evidence budget",
  "date": "2026-09-04",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "retrieval", "context-engineering", "evaluation"],
  "references": ["reference:arxiv:2609.03915"],
  "status": "proposed",
  "hypothesis": "On temporally dispersed multi-hop questions, adding a validated rule layer only for candidate reranking will improve answer correctness and gold-support recall over direct fact retrieval under the same final evidence and token budget, without materially degrading single-hop questions.",
  "success_criterion": "On 100 paired held-out questions, the rule-guided treatment must improve multi-hop answer correctness by at least 8 percentage points and gold-support recall@6 by at least 10 percentage points, with the 95% paired-bootstrap confidence interval for each improvement excluding zero; overall answer correctness must be at least 75%, citation precision at least 90%, unsupported-claim rate at most 5%, and single-hop correctness may not decline by more than 3 percentage points.",
  "stop_condition": "Stop after all 100 paired questions are scored, or invalidate and stop earlier if any held-out answer or gold-support label is used during rule induction, rule validation, retrieval, or reranking; also stop if the two variants do not receive identical final evidence-count and token-budget limits.",
  "related": ["brief:ai-knowledge:2026-09-04"]
}
---

# Test rule-guided memory retrieval under a fixed evidence budget

## Why this experiment

RuleMem reports strong long-term conversational QA results from a system that induces and validates reusable rules, then uses those rules during retrieval and reasoning. The paper does not isolate the marginal value of the rule layer. This experiment tests a narrower question: **does validated relational structure improve evidence discovery when the answer model and final context budget are held fixed?** [Primary source](https://arxiv.org/abs/2609.03915)

## Minimal procedure

1. Build a fixed long-term-memory corpus from conversation histories and create 100 held-out questions: 50 temporally dispersed multi-hop questions, 25 single-hop questions, and 25 update/exception questions.
2. Before evaluation, human annotators mark the **gold support set** for each question: the minimal set of historical turns whose contents are sufficient to justify the answer. Gold labels are evaluation-only.
3. Create a rule layer from the same historical corpus using a fixed rule-induction prompt. A **valid rule** must cite at least two source turns when relational, contain no claim unsupported by those turns, and pass an independent human validation pass before the held-out questions are run. Invalid rules are discarded.
4. Run the same base candidate retriever once per question to produce a frozen top-30 candidate pool.
5. **Baseline:** rerank the frozen pool using the existing relevance score only.
6. **Treatment:** use validated rules matching the question or candidate facts to add a fixed rule-support score to reranking. The treatment may not add documents outside the frozen top-30 pool.
7. Give both variants the same answer model, prompt, maximum six evidence passages, citation format, and context-token budget. Randomize variant order during scoring and blind human graders to the variant.

## Measurement

Define:

- **Answer correctness:** human rubric score converted to pass/fail against a prewritten answer key.
- **Gold-support recall@6:** fraction of the human-labeled gold support turns present in the six final evidence passages.
- **Citation precision:** fraction of answer citations that actually support the adjacent factual claim.
- **Unsupported-claim rate:** fraction of substantive factual claims not supported by any supplied evidence.
- **Multi-hop question:** a question whose gold answer requires combining at least two non-adjacent historical turns.
- **Single-hop question:** a question answerable from one historical turn.
- **Update/exception question:** a question where a later turn changes, narrows, or overrides an earlier fact or preference.

Report paired differences for every question, subgroup results for all three question classes, and 95% paired-bootstrap confidence intervals for correctness and support recall. Also report the fraction of induced rules rejected during validation; a high rejection rate is part of the engineering cost even if the surviving rules help.

The experiment passes only if the front-matter success criterion is met. The absolute correctness, citation, and unsupported-claim guardrails prevent a relative retrieval gain from passing when both systems are broadly unreliable.

## Expected effort

About one focused day if a labeled long-term conversation set already exists; two to three days if the 100-question set and gold support labels must be created from scratch. The largest manual cost is rule and evidence validation, not model inference.

## Stop condition

Stop after the fixed 100 paired questions are scored. Invalidate and stop earlier if held-out answers or gold-support labels leak into rule construction or ranking, or if the two variants receive unequal final evidence-count or token budgets.
