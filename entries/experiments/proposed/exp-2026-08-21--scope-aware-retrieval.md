---
{
  "schema_version": 1,
  "id": "experiment:2026-08-21:scope-aware-retrieval",
  "title": "Test scope-aware metadata filtering against semantic retrieval",
  "date": "2026-08-21",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["retrieval", "reranking", "evaluation", "context-engineering"],
  "references": ["reference:arxiv:2608.20246"],
  "status": "proposed",
  "hypothesis": "For queries whose correct answer depends on an explicit metadata scope, applying that scope as a hard prefilter before otherwise identical dense retrieval will improve answer-bearing Recall@5 by at least 10 percentage points and end-to-end answer accuracy by at least 5 percentage points versus unfiltered dense retrieval.",
  "success_criterion": "Across at least 60 paired questions, the scoped-query variant improves answer-bearing Recall@5 by at least 10 percentage points and answer accuracy by at least 5 percentage points, while overall answer accuracy remains at least 80%, citation correctness remains at least 85%, unscoped-query answer accuracy falls by no more than 3 percentage points, and no metadata subgroup regresses by more than 10 percentage points.",
  "stop_condition": "Stop after 120 question-variant evaluations, or after an interim analysis at 60 evaluations if the 95% confidence interval excludes a 5 percentage-point retrieval gain and the observed gain is below 2 percentage points, or if either variant's absolute answer accuracy falls below 70%.",
  "related": ["brief:ai-knowledge:2026-08-21"]
}
---

# Test scope-aware metadata filtering against semantic retrieval

## Why this experiment

Recent retrieval work suggests that explicit scope metadata can be more valuable than another layer of semantic similarity when a query asks for an answer within a particular category, jurisdiction, version, team, region, or other constrained subset. This experiment tests that transferable idea without assuming the paper's domain-specific result will generalize.

## Minimal procedure

1. Select a corpus with at least 200 passages and one reliable metadata dimension containing at least four values, such as policy version, product, team, jurisdiction, or region.
2. Create at least 60 human-reviewed questions: 40 scoped questions that explicitly name one metadata value and 20 unscoped questions. For every question, label one or more answer-bearing gold passages.
3. Freeze the chunking, embedding model, vector index, retrieval depth (`k=5`), generator, prompt, temperature, and citation instructions.
4. Evaluate two retrieval variants. **Baseline:** dense top-5 retrieval over the complete corpus. **Scoped:** for scoped questions, apply the explicit gold metadata value as a hard filter before running the same dense top-5 retrieval; for unscoped questions, search the complete corpus exactly as the baseline does.
5. Do not change reranking, generation, or metadata extraction between variants. Use the known query scope supplied by the evaluation fixture so the experiment measures retrieval filtering rather than scope parsing.
6. Score the same questions in paired fashion and blind the answer scorer to the retrieval variant when practical.

## Measurement

Track answer-bearing Recall@5, MRR@5, answer correctness, citation correctness, unsupported-claim rate, and retrieved-context tokens. Report paired differences with 95% bootstrap confidence intervals and break out results by metadata value so aggregate gains cannot conceal a weak subgroup.

Definitions:

- **Scoped query:** a question whose correct answer depends on the metadata value explicitly supplied in the query fixture.
- **Answer-bearing gold passage:** a human-labeled passage containing sufficient evidence to answer the question, rather than only sharing its topic.
- **Answer-bearing Recall@5:** whether at least one gold passage appears in the top five retrieved passages.
- **Correct answer:** an answer satisfying the predefined factual rubric without material contradiction.
- **Correct citation:** a citation pointing to a passage that actually supports the associated claim.

## Expected effort

Four to six hours for corpus selection, metadata audit, gold-passage labeling, scripted retrieval variants, paired generation, and analysis, assuming an existing vector retrieval and evaluation harness.

## Stop condition

Stop after 120 question-variant evaluations. An early stop after 60 evaluations is allowed only if the 95% confidence interval excludes a 5 percentage-point retrieval improvement and the observed improvement is below 2 percentage points, or if either variant's answer accuracy falls below 70%, indicating the test setup needs revision before the retrieval comparison is useful.
