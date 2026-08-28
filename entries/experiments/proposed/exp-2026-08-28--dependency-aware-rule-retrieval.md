---
{
  "schema_version": 1,
  "id": "experiment:2026-08-28:dependency-aware-rule-retrieval",
  "title": "Test dependency-aware rule retrieval against dense RAG",
  "date": "2026-08-28",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["knowledge-graphs", "retrieval", "rag", "evaluation", "provenance"],
  "references": ["reference:arxiv:2608.26836"],
  "status": "proposed",
  "hypothesis": "For questions whose correct answer requires two or more explicitly linked rules, adding one-hop dependency expansion from a frozen logical rule graph to an otherwise identical dense retriever will improve required-rule Recall@5 by at least 15 percentage points and answer accuracy by at least 8 percentage points relative to dense-only retrieval under the same final context budget.",
  "success_criterion": "Across at least 40 paired multi-rule questions, dependency-aware retrieval improves required-rule Recall@5 by at least 15 percentage points and answer accuracy by at least 8 percentage points, while treatment answer accuracy remains at least 80%, citation correctness remains at least 85%, unsupported-claim rate stays at or below 5%, and median retrieved-context tokens are no more than 10% above baseline. Across at least 20 single-rule controls, treatment answer accuracy may regress by no more than 3 percentage points.",
  "stop_condition": "Stop after 120 condition-question evaluations. Stop early after at least 30 paired questions if treatment answer accuracy falls below 70%, citation correctness falls below 75%, or the two conditions cannot maintain identical corpus, model, prompt, dense index, final context budget, and gold graph definitions.",
  "related": ["brief:ai-knowledge:2026-08-28"]
}
---

# Test dependency-aware rule retrieval against dense RAG

## Why this experiment

Dense retrieval is good at semantic similarity but can miss a prerequisite, exception, or dependent rule that is lexically distant from the query. SymbolLKG proposes representing such dependencies explicitly. This experiment isolates the retrieval value of that structure without adding symbolic solving or changing the generator.

## Minimal procedure

1. Select a stable policy, specification, or rules corpus with at least 200 source passages and enough cross-references to support multi-step questions.
2. Before evaluation, have a human reviewer build a frozen rule graph mapping each rule node to its source passage and labeling only three edge types: **prerequisite**, **exception**, and **dependency**. Do not infer or modify edges during evaluation.
3. Create at least 60 human-reviewed questions: 40 whose answers require two to four linked rules and 20 single-rule controls. Label all source passages required for each answer before either retrieval condition runs.
4. **Dense baseline:** retrieve the top five passages from the frozen dense index.
5. **Dependency-aware treatment:** start from the same dense candidates, add one-hop graph neighbors of those candidate rule nodes, then select the final passages with a fixed reranking formula combining the original dense score and a predefined edge bonus. Enforce the same final passage count and context-token ceiling as baseline.
6. Keep corpus version, chunking, embeddings, dense index, generator model, system prompt, question text, temperature, answer budget, and citation instructions identical. Run both conditions for every question in randomized order.
7. Score answers against a predefined factual rubric and citations against the human-labeled source passages, blinded to retrieval condition when practical.

## Measurement

Track required-rule Recall@5, MRR@5, answer correctness, citation correctness, unsupported-claim rate, retrieved-context tokens, and retrieval latency. Report paired differences with 95% bootstrap confidence intervals overall and separately for multi-rule and single-rule questions.

Definitions:

- **Required rule:** a human-labeled source rule without which the expected answer cannot be derived from the question and other labeled rules.
- **Required-rule Recall@5:** the fraction of all required rules represented in the five final retrieved passages.
- **Dependency-aware retrieval:** dense candidate generation followed by one-hop expansion over the frozen prerequisite, exception, and dependency edges before fixed-budget reranking.
- **Correct answer:** a response satisfying the predefined factual and logical rubric without a material contradiction or omitted required condition.
- **Correct citation:** a citation to a source passage that directly supports the associated rule or claim.
- **Unsupported claim:** a material factual or rule assertion not supported by the current question or retrieved source passages.

## Expected effort

Four to six hours for graph construction, gold-rule labeling, scripted paired retrieval, generation, scoring, and analysis, assuming an existing dense retrieval and evaluation harness.

## Stop condition

Stop after 120 condition-question evaluations. An early quality-failure stop is allowed after at least 30 paired questions if treatment accuracy is below 70%, citation correctness is below 75%, or corpus, model, prompt, index, context-budget, or graph-label parity cannot be maintained.
