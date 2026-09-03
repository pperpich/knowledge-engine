---
{
  "schema_version": 1,
  "id": "experiment:2026-09-03:incremental-pooled-retrieval-evaluation",
  "title": "Test incremental pooled judgments for retrieval model selection",
  "date": "2026-09-03",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["retrieval", "evaluation", "rag"],
  "references": ["reference:arxiv:2609.02745"],
  "status": "proposed",
  "hypothesis": "Reusing pooled relevance judgments as retrieval candidates are added will preserve at least 95% of pairwise system orderings relative to fresh full-pool evaluation while reducing new judgment volume by at least 50%.",
  "success_criterion": "Across at least 100 queries and 10 retrieval configurations introduced in five staged rounds, incremental evaluation preserves >=95% of pairwise orderings and Spearman rank correlation >=0.95 versus fresh full-pool evaluation, reduces newly generated relevance judgments by >=50%, and both methods achieve Spearman >=0.85 against an independently human-labeled audit subset of at least 30 queries.",
  "stop_condition": "Stop if the human-audit correlation for either method falls below 0.85, if fewer than 100 queries or 10 meaningfully distinct retrieval configurations are available, or if judgment reuse is below 20% after the second staged addition.",
  "related": ["brief:ai-knowledge:2026-09-03"]
}
---

# Test incremental pooled judgments for retrieval model selection

## Why this experiment

Retrieval evaluation becomes expensive when every new embedding model, sparse retriever, reranker, or hybrid configuration triggers a full relevance-judgment pass. The September 2 preprint on incremental pooled LLM evaluation reports high judgment reuse and strong ranking preservation, but the useful production question is whether that economy survives on our own query distribution without hiding poor judgment quality.

## Minimal procedure

1. Freeze a set of at least 100 representative queries and 10 meaningfully distinct retrieval configurations spanning dense, sparse, hybrid, or reranked variants. A configuration is meaningfully distinct when it changes candidate generation or ordering, not only a non-retrieval runtime parameter.
2. Randomly select at least 30 queries for an independent human-labeled audit set. Reviewers label relevance for the union of top-10 documents retrieved by all 10 configurations for those queries before looking at either evaluation method's rankings.
3. Introduce the 10 configurations in five staged rounds of two. In the **fresh full-pool baseline**, regenerate relevance judgments for the full union of documents retrieved by every configuration available in that round. In the **incremental treatment**, retain all prior judgments and judge only documents newly contributed by the two added configurations.
4. Use the same judge model, rubric, prompt, temperature, top-k, corpus snapshot, and metric implementation for both conditions. Randomize document order within each judging batch. "Pairwise ordering" means which of two retrieval configurations scores higher on the primary retrieval metric; ties are excluded from the preservation denominator but reported separately.
5. At every round, compute the primary metric for every available configuration, pairwise ordering agreement, Spearman rank correlation, number of new judgments, total judge tokens/cost, and correlation to the human audit labels.

## Measurement

Primary outcome: pairwise ranking preservation between incremental and fresh full-pool evaluation after each staged addition.

Secondary outcomes: Spearman rank correlation, new judgment count, cumulative evaluation cost, per-query disagreement rate, and correlation against the independently human-labeled audit subset. Report bootstrap 95% confidence intervals for ranking agreement and human-audit correlation. Report results by query slice when at least 20 queries exist in a slice.

The fresh full-pool baseline means all unique retrieved documents from configurations present in that round are judged anew, even if they appeared in an earlier round. The incremental treatment means a document's stored judgment is reused once its canonical document ID has been judged. A judgment is considered reused only when the canonical document ID and corpus version are unchanged.

## Expected effort

About half a day if the query set and retrievers already exist; one to two days if a human audit pool and evaluation harness must be assembled.

## Stop condition

Stop if either evaluation path correlates below 0.85 with the independent human audit, because cost savings are not useful if the relevance judgments themselves are too weak. Also stop if the minimum query/configuration counts cannot be met or if early document overlap is too low to make pooled reuse operationally meaningful.