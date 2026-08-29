---
{
  "schema_version": 1,
  "id": "experiment:2026-08-29:independent-rag-validation",
  "title": "Test independent evidence validation against shared-context validation",
  "date": "2026-08-29",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["rag", "retrieval", "evaluation", "provenance", "safety-and-security"],
  "references": ["reference:arxiv:2607.23838"],
  "status": "proposed",
  "hypothesis": "When retrieved context contains a plausible poisoned passage, a validator that checks claims against an independently retrieved trusted evidence shard will reduce poisoned-answer acceptance by at least 15 percentage points relative to a validator restricted to the generator's same retrieved context.",
  "success_criterion": "Across at least 60 paired questions, independent validation reduces poisoned-answer acceptance by at least 15 percentage points with a 95% bootstrap confidence interval excluding zero, while clean-set answer accuracy remains at least 80%, citation correctness remains at least 85%, and clean accuracy is no more than 3 percentage points below shared-context validation.",
  "stop_condition": "Stop after 60 paired questions, or after 30 only if the independent validator fails either absolute-quality guardrail by more than 10 percentage points; do not stop early merely because the treatment difference is small.",
  "related": ["brief:ai-knowledge:2026-08-29"]
}
---

# Test independent evidence validation against shared-context validation

## Why this experiment

TriShieldRAG v2 reports that multiple defenses can fail together when reranking and consensus validation consume the same poisoned retrieved evidence. This experiment isolates whether evidence independence, rather than simply adding another model or validation stage, improves robustness in a small local RAG pipeline.

## Minimal procedure

1. Build 60 answerable questions with human-reviewed expected answers and citations: 30 clean cases and 30 poisoned cases.
2. For each poisoned case, insert one plausible but false passage that contradicts the expected answer and is eligible for the primary retriever's top-k results. Freeze the primary top-k set for both variants.
3. Use the same generator, prompt, model, temperature, primary retriever, top-k, and token budget in both variants.
4. **Shared-context validator:** judge the generated answer using only the same frozen primary top-k evidence shown to the generator.
5. **Independent validator:** judge the same generated answer after retrieving up to the same validation-token budget from a separate, human-reviewed trusted shard that excludes the injected poison records.
6. Keep the acceptance threshold and validation prompt identical. Blind human scoring to treatment when practical.

## Measurement

Track poisoned-answer acceptance, final answer accuracy, citation correctness, unsupported-claim rate, false rejection of clean answers, validation tokens, and latency. Use paired question-level comparisons and 95% bootstrap confidence intervals; report clean and poisoned subsets separately.

Definitions:

- **Poisoned-answer acceptance:** the system returns an answer materially supported by the injected false passage rather than rejecting or correcting it.
- **Shared-context validation:** the validator has no evidence outside the generator's frozen retrieved set.
- **Independent evidence:** evidence comes from a separately indexed trusted shard that does not contain the injected poison records and is not derived from the primary top-k set.
- **Citation correctness:** every material factual claim used for the answer is supported by the cited passage.

## Expected effort

Four to six hours for question construction, poison injection, trusted-shard labeling, scripted evaluation, and paired analysis assuming an existing RAG harness.

## Stop condition

Stop after all 60 paired questions. An early stop after 30 is allowed only for a severe absolute-quality failure; a null treatment effect is not by itself an early-stop condition.
