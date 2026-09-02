---
{
  "schema_version": 1,
  "id": "experiment:2026-09-02:fact-utility-reranking",
  "title": "Test fact-utility reranking against relevance-only retrieval",
  "date": "2026-09-02",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["retrieval", "reranking", "evaluation", "rag"],
  "references": ["reference:arxiv:2609.00833"],
  "status": "proposed",
  "hypothesis": "On held-out multi-hop questions, reranking a frozen retrieval candidate pool with a fact-utility signal learned only from separate development trajectories will improve answer accuracy by at least 5 percentage points and gold-support recall@6 by at least 8 percentage points versus relevance-only ranking, without reducing single-hop answer accuracy by more than 2 percentage points.",
  "success_criterion": "Across at least 80 held-out paired questions (60 multi-hop, 20 single-hop), the utility-aware treatment must improve multi-hop answer accuracy by at least 5 percentage points and gold-support recall@6 by at least 8 percentage points, with the 95% paired-bootstrap confidence interval for the multi-hop answer-accuracy difference excluding zero; single-hop answer accuracy may fall by no more than 2 percentage points. Absolute guardrails: treatment answer accuracy must be at least 75% overall, citation precision at least 90%, and unsupported-claim rate at most 5%.",
  "stop_condition": "Stop after 160 condition-question evaluations. Stop early after at least 40 paired questions if candidate pools differ between conditions, utility estimation uses any held-out evaluation labels or trajectories, treatment overall answer accuracy falls below 60%, citation precision falls below 80%, or more than 5% of questions cannot be scored with the predefined rubric.",
  "related": ["brief:ai-knowledge:2026-09-02"]
}
---

# Test fact-utility reranking against relevance-only retrieval

## Why this experiment

Dense Process Supervision for Search Agents via Fact Utility Estimation uses an explicit fact store and estimates the downstream utility of fact clusters from grouped trajectories to create denser search-agent supervision. The paper does not test production reranking. This experiment asks a narrower, falsifiable question: whether a utility estimate learned from prior trajectories helps a fixed RAG pipeline choose better evidence from an already-retrieved candidate pool.

## Minimal procedure

1. Prepare a **development set** of at least 120 questions and a disjoint **evaluation set** of at least 80 questions. The evaluation set should contain 60 multi-hop and 20 single-hop questions across at least four topics. No evaluation question, answer, support label, or trajectory may be used to estimate utility.
2. Run the production retriever once per evaluation question and freeze its top-20 passage candidate pool. Both conditions receive exactly the same candidates in the same raw form.
3. On the development set only, extract atomic evidence facts from retrieved observations with one fixed extraction procedure. Cluster semantically equivalent facts, then estimate each cluster's **fact utility** as its posterior association with successful versus unsuccessful answer trajectories. Freeze the extractor, clustering rule, utility table/model, and all hyperparameters before evaluation.
4. **Baseline:** rank each frozen candidate pool using the production relevance score only and pass the top six passages to the reader.
5. **Treatment:** rerank the same frozen pool using a preregistered combination of normalized relevance and fact utility; for example, `0.5 * relevance + 0.5 * utility`. Do not tune the weight on the evaluation set. Pass the top six passages to the same reader.
6. Keep the reader model, system prompt, answer prompt, temperature, token budget, passage count, citation format, and scoring rubric identical. Randomize condition order for paired runs.
7. Before running evaluation, human-label the gold supporting passages/facts needed for each question. These labels are used only for scoring support recall, never for ranking.

## Measurement

Primary outcomes are multi-hop answer accuracy and gold-support recall@6. Secondary outcomes are overall and single-hop answer accuracy, citation precision, unsupported-claim rate, latency, and reranking cost. Report paired differences, 95% bootstrap confidence intervals, and per-topic results.

Definitions:

- **Baseline:** the existing production relevance score applied to the frozen top-20 candidate pool, with no fact-utility feature.
- **Fact utility:** a score learned only on development trajectories that estimates how strongly a semantically clustered evidence fact is associated with successful downstream answers; it is frozen before evaluation.
- **Gold-support recall@6:** the fraction of human-labeled facts or passages required to answer a question correctly that are represented in the six passages supplied to the reader.
- **Answer accuracy:** exact or rubric-defined semantic correctness against the human-reviewed gold answer; the scoring rule is fixed before evaluation.
- **Citation precision:** the fraction of answer citations that actually support the claim they are attached to under human review.
- **Unsupported-claim rate:** the fraction of substantive answer claims that are neither supported by the supplied passages nor part of the predefined gold answer/background allowance.
- **Production order:** the baseline ordering produced by the current relevance-only ranker before any experimental reranking.

## Expected effort

Five to eight hours for development-trajectory processing, fact extraction and clustering, utility estimation, gold-support labeling, paired evaluation, and analysis, assuming the existing retriever and reader can be run from a reproducible evaluation harness.

## Stop condition

Stop after 160 condition-question evaluations. Stop early after at least 40 paired questions if treatment isolation is broken, held-out information leaks into utility estimation, treatment overall answer accuracy is below 60%, citation precision is below 80%, or more than 5% of the evaluation set cannot be scored consistently. Any such failure invalidates the claimed comparison and requires redesign rather than interpretation of partial gains.
