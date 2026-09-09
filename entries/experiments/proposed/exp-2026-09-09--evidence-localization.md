---
{
  "schema_version": 1,
  "id": "experiment:2026-09-09:evidence-localization",
  "title": "Test Evidence Localization After Frozen Retrieval",
  "date": "2026-09-09",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "retrieval", "reranking", "context-engineering", "evaluation", "provenance"],
  "references": ["reference:arxiv:2609.07093"],
  "status": "proposed",
  "hypothesis": "Given an identical frozen top-12 memory candidate set and reader budget, query-specific evidence localization plus reranking will improve correctness on complex long-term-memory questions by at least 5 percentage points versus packing whole retrieved units, without reducing citation support or single-fact correctness.",
  "success_criterion": "On 120 paired held-out questions, the localization variant improves correctness by at least 5 percentage points on the 90 complex questions and the paired-bootstrap 95% confidence interval for that difference excludes zero; it also achieves at least 80% overall correctness, at least 90% citation support, at most 5% unsupported factual clauses, and no more than a 2-point correctness drop on the 30 single-fact controls.",
  "stop_condition": "Stop and do not interpret the result as a localization test if fewer than 90% of questions have all required gold evidence in the frozen top-12 candidate set, if the two variants differ in reader model/prompt/citation format or input-token budget by more than 5%, or if gold labels leak into localization; otherwise stop after all 120 paired questions are scored and the preregistered paired analysis is complete.",
  "related": ["brief:ai-knowledge:2026-09-09"]
}
---

# Test Evidence Localization After Frozen Retrieval

## Why this experiment

MemLoc combines multi-granularity retrieval, graph routing, learned evidence localization, reranking, and grounded generation. Its end-to-end result therefore cannot tell us whether localization alone improves an existing memory system. This experiment isolates the narrower builder question: after the retriever has already selected the right memory containers, does extracting and ordering the answer-bearing spans make the fixed reader use that evidence more reliably? [Primary source](https://arxiv.org/abs/2609.07093)

## Minimal procedure

1. Build **120 held-out questions** from at least 30 long conversation histories or organizational-memory traces: 60 multi-hop/temporal questions, 30 questions where relevant evidence is surrounded by substantial within-unit noise, and 30 single-fact controls. No evaluation question may be used to tune the retriever or localization rules.
2. For every question, run the production retriever once and freeze its **top-12 candidate memory units**. A *memory unit* is the exact object returned by the existing retriever before reader-context packing. Mark a question eligible only if human adjudication confirms that all facts required by the gold answer are present somewhere in those 12 units. Gold labels are evaluation-only and must not be visible to either variant.
3. **Baseline — whole-unit packing:** pack the frozen candidate units into the reader context in *production order*, defined as the retriever's descending score with source position as the deterministic tie-breaker. Truncate only at unit boundaries to the fixed reader input-token budget.
4. **Treatment — evidence localization:** from the same frozen candidates, use a preregistered query-conditioned locator to select contiguous evidence spans, retain each span's source-unit ID, rerank the selected spans, and pack them to the same reader input-token budget. The locator may use the query and candidate text but not gold answers, gold evidence labels, or evaluation scores.
5. Hold the reader model/version, system and user prompts, decoding settings, answer schema, citation format, input-token budget, and evaluation code constant. Randomize variant order when invoking any non-deterministic external judge.
6. Score all eligible questions as paired observations and report the three question groups separately as well as in aggregate.

## Measurement

**Correctness** is binary per question: exact normalized match for closed-form answers; for free-form answers, a blinded adjudicator awards 1 only when every required gold fact is present and no answer-changing contradiction is present.

**Citation support** is the fraction of factual answer clauses whose cited source-unit ID contains evidence that directly supports that clause. **Unsupported factual-clause rate** is the fraction of factual clauses with no supporting evidence in any cited unit.

The primary comparison is correctness on the 90 complex questions (multi-hop/temporal plus noisy-unit groups). Compute the paired difference in correctness and a 95% confidence interval from 10,000 paired bootstrap resamples. Also report overall correctness, citation support, unsupported factual-clause rate, input tokens actually consumed, and results for each question group.

A result counts as positive only if the point improvement on complex questions is at least 5 percentage points and the 95% interval excludes zero, while the treatment remains at or above **80% overall correctness**, **90% citation support**, and at or below **5% unsupported factual clauses**. The 30 single-fact controls may degrade by no more than 2 percentage points. These absolute guardrails prevent a uniformly poor pair of systems from passing on a relative gap alone.

## Expected effort

About **1–2 engineer-days** if representative histories, the production retriever, and answer golds already exist: roughly half a day to freeze candidates and implement deterministic localization output, half a day to run paired evaluation, and the remainder for blinded citation adjudication and error review.

## Stop condition

Stop before outcome interpretation if the frozen retriever fails the **retrieval-eligibility gate**: at least 90% of the 120 questions must contain all answer-required gold evidence in their top-12 candidates. Below that threshold, retrieval recall is too large a confound and should be repaired or studied separately.

Also stop if the two variants differ by more than 5% in effective reader input tokens, if reader/prompt/citation settings drift, or if gold evidence or answers leak into the locator. Otherwise stop after all 120 paired questions are scored and the preregistered bootstrap and per-group reports are complete, regardless of whether the hypothesis succeeds.
