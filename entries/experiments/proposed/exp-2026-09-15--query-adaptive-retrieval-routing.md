---
{
  "schema_version": 1,
  "id": "experiment:ai-knowledge:2026-09-15:query-adaptive-retrieval-routing",
  "title": "Query-adaptive retrieval routing",
  "date": "2026-09-15",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["retrieval", "reranking", "evaluation", "context-engineering"],
  "references": ["reference:github:copilot-auto-selection-tiers", "reference:arxiv:2609.12913"],
  "status": "proposed",
  "hypothesis": "A query-adaptive router that sends straightforward queries to a compact retriever and difficult queries to the existing production retrieval-plus-reranking path will reduce median retrieval compute cost by at least 25% without decreasing mean nDCG@10 by more than 1.0 percentage point, while maintaining absolute mean nDCG@10 of at least 0.70 in every topic family.",
  "success_criterion": "Across 300 paired queries spanning six topic families, the treatment reduces median retrieval compute cost by at least 25%; the paired mean nDCG@10 difference versus baseline is no worse than -0.01 with the lower bound of a 95% paired bootstrap confidence interval above -0.02; and treatment mean nDCG@10 is at least 0.70 in every topic family. All three conditions must pass.",
  "stop_condition": "Stop after all 300 paired queries are scored, or earlier if any topic family falls below 0.60 mean nDCG@10 after at least 30 treatment queries in that family, or if the router sends more than 90% of queries to either path after the first 120 queries.",
  "related": ["brief:ai-knowledge:2026-09-15"]
}
---

# Query-adaptive retrieval routing

## Why this experiment

GitHub's new Auto tiers make an explicit product bet that routing can optimize different cost-quality objectives per prompt. Separately, the PolDense/EuroDense preprint reports competitive retrieval from substantially smaller models. The experiment tests the narrower systems question: can a knowledge engine spend expensive retrieval/reranking only where query difficulty warrants it?

## Minimal procedure

1. Sample 300 representative queries, 50 from each of six predeclared topic families. Freeze the corpus, relevance judgments, query set, embedding index, model versions, and scoring code before evaluation.
2. Define **baseline** as the current production order: retrieve the same fixed candidate count with the existing retriever, then apply the existing reranker, returning the top 10.
3. Define **compact path** as retrieval with one fixed compact retriever and no expensive reranker. Define **strong path** as exactly the baseline path.
4. Before looking at test-set relevance labels, build a deterministic router from development data only. Inputs may include query length, lexical specificity, entity count, and the compact retriever's top-k score margin. The router emits only `compact` or `strong`.
5. Run baseline and routed treatment for every query. Preserve candidate/result IDs, latency, token or accelerator usage, route choice, and relevance scores.
6. Report paired aggregate results, a 10,000-resample paired bootstrap 95% confidence interval for the nDCG@10 difference, route mix, and per-topic results. Do not tune the router on these 300 test queries.

## Measurement

**Correctness** means nDCG@10 against the frozen graded relevance judgments. **Retrieval compute cost** means the measured provider charge when available; otherwise use one frozen proxy such as accelerator-milliseconds plus reranker token cost and apply it identically to both variants. **Query difficulty** is not a human label at test time; it is only the router's deterministic decision from the frozen features above.

Primary quality metric: paired nDCG@10. Secondary metrics: Recall@20, p50/p95 latency, route share, and retrieval compute cost. Report all metrics per topic family so an aggregate win cannot hide a localized regression.

The experiment succeeds only when cost falls at least 25%, mean quality loss is at most 0.01, the 95% paired-bootstrap lower bound stays above -0.02, and every topic family remains at or above 0.70 mean nDCG@10. The absolute per-topic guardrail prevents uniformly poor performance from passing on cost or parity alone.

## Expected effort

About one engineering day if a frozen relevance set and both retrieval paths already exist; two to three days if relevance judgments or cost instrumentation must be prepared.

## Stop condition

Stop after 300 paired queries, or earlier for a severe per-topic quality failure or a router collapse as defined in front matter. A failed stop condition is a failed experiment, not an invitation to retune on the test set.