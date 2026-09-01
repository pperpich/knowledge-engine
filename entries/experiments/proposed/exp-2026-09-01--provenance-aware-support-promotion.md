---
{
  "schema_version": 1,
  "id": "experiment:2026-09-01:provenance-aware-support-promotion",
  "title": "Test provenance-aware support promotion under a fixed RAG budget",
  "date": "2026-09-01",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["rag", "retrieval", "reranking", "provenance", "context-engineering", "evaluation"],
  "references": ["reference:arxiv:2608.29753"],
  "status": "proposed",
  "hypothesis": "For multi-hop questions whose frozen candidate pool contains the complete human-labeled support set, provenance-aware joint-support reranking will improve support-set recall by at least 8 percentage points and answer accuracy by at least 3 percentage points versus independent relevance-only reranking under the same final context budget.",
  "success_criterion": "Across at least 60 paired multi-hop questions from at least three topics, the treatment improves mean support-set recall by at least 8 percentage points and answer accuracy by at least 3 percentage points, with a paired-bootstrap 95% confidence interval for support-set recall improvement excluding zero; treatment answer accuracy must also be at least 80%, citation correctness at least 85%, unsupported-claim rate at most 10%, and no topic may lose more than 5 percentage points of answer accuracy.",
  "stop_condition": "Stop after 60 eligible paired questions, or stop before evaluation if fewer than 70% of sampled questions have their complete gold support set in the frozen candidate pool or if the two variants cannot be held to the same passage and token budgets.",
  "related": ["brief:ai-knowledge:2026-09-01"]
}
---

# Test provenance-aware support promotion under a fixed RAG budget

## Why this experiment

PAGE-RAG argues that expanded retrieval is useful for multi-hop questions only if a selection stage can distinguish genuine joint support from merely connected or topically similar candidates. This experiment tests the narrower local claim: whether scoring candidate combinations for complementary support and provenance improves what reaches the reader without changing upstream retrieval or the final context budget.

## Minimal procedure

1. Select at least 60 multi-hop questions across at least three topics. Before evaluation, define an answer key and have a reviewer label the minimal set of passages that jointly supports each answer.
2. Run the existing retriever once per question and freeze the top-20 candidate pool. A question is **eligible** only if its complete human-labeled support set is present in that pool.
3. Fix the final reader budget to the same maximum number of passages and token cap for both variants.
4. **Baseline — relevance-only reranking:** score each candidate independently for relevance to the question and select the highest-scoring candidates that fit the budget.
5. **Treatment — provenance-aware joint-support reranking:** use the same candidate scores plus source identifiers and deterministic candidate relationships available before answer generation, such as shared normalized entities or same-source adjacency. Reward candidate sets that add complementary evidence while penalizing high-frequency bridge entities and redundant passages. Do not use answer keys or gold support labels in ranking.
6. Generate answers with the same model, system prompt, decoding settings, citation instructions, and final context budget for both variants.
7. Score both variants blindly against the predefined answer and support rubrics.

## Measurement

Definitions:

- **Complete support set:** the smallest reviewer-labeled passage set sufficient to answer the multi-hop question without unsupported inference.
- **Support-set recall:** fraction of passages in the complete support set that appear in the final reader context.
- **Answer correctness:** the generated answer satisfies the predefined factual rubric without material contradiction.
- **Citation correctness:** cited passages actually support the claims attributed to them.
- **Unsupported claim:** a material factual claim not supported by the final supplied context.
- **Fixed budget:** identical maximum passage count and input-token cap for baseline and treatment.

Report paired per-question differences in support-set recall, answer correctness, citation correctness, and unsupported-claim rate. Report means, paired-bootstrap 95% confidence intervals, and per-topic results. Also report the fraction of initially sampled questions excluded because upstream retrieval failed to recover the complete support set; that separates retrieval failures from promotion failures.

## Expected effort

Four to six hours for question selection and labeling, frozen-candidate generation, the two reranking variants, paired evaluation, and bootstrap analysis, assuming an existing retrieval and generation harness.

## Stop condition

Stop after 60 eligible paired questions. Do not interpret a promotion result if fewer than 70% of sampled questions contain their complete support set upstream, because retrieval recall would then be the dominant bottleneck. Also stop if candidate pools, passage limits, token budgets, generation settings, or scoring rubrics cannot be kept identical across variants.
