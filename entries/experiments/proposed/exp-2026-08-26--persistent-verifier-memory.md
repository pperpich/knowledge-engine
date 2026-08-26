---
{
  "schema_version": 1,
  "id": "experiment:2026-08-26:persistent-verifier-memory",
  "title": "Test persistent verifier metadata against admission-only memory filtering",
  "date": "2026-08-26",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "provenance", "evaluation", "context-engineering"],
  "references": ["reference:arxiv:2608.21867"],
  "status": "proposed",
  "hypothesis": "For a fixed admitted memory bank containing useful, stale, conflicting, and misleading records, preserving frozen verifier metadata for retrieval and conflict-aware reranking will reduce harmful-memory inclusion by at least 30% relative to discarding verifier signals after admission, while improving task success by at least 5 percentage points without reducing required-evidence recall by more than 3 percentage points.",
  "success_criterion": "Across at least 60 paired tasks, persistent verifier metadata reduces harmful-memory inclusion by at least 30% relative and to no more than 10% absolute, improves mean task success by at least 5 percentage points with absolute task success at or above 80%, maintains required-evidence recall at or above 85% and within 3 percentage points of baseline, and keeps unsupported-claim rate at or below 5%.",
  "stop_condition": "Stop after 120 condition-task evaluations. Stop early after at least 30 paired tasks if treatment task success or required-evidence recall falls below 70%, or if the two conditions do not receive identical admitted records, candidate retrieval sets, model settings, and token budgets.",
  "related": ["brief:ai-knowledge:2026-08-26"]
}
---

# Test persistent verifier metadata against admission-only memory filtering

## Why this experiment

A memory verifier can improve the decision to admit a record, but its judgment is often discarded after that write. MemGuard proposes that verification signals remain attached to memory throughout retrieval, conflict handling, summarization, and archival. This experiment isolates the narrower question: does retaining verifier metadata improve retrieval decisions after the admitted memory bank is already fixed?

## Minimal procedure

1. Build at least 60 long-horizon tasks across at least three task families. For every task, create a frozen memory bank containing required evidence plus semantically plausible stale, conflicting, irrelevant, or misleading records.
2. Human-label each memory record as **required**, **useful**, **irrelevant**, **stale**, **conflicting**, or **misleading** for the evaluated task. Before evaluation, also attach one frozen verifier result containing a quality score, confidence, label, and verification timestamp.
3. Admit exactly the same records in both conditions. Do not let the verifier change which records exist in the store.
4. **Admission-only baseline:** hide verifier metadata after admission and rank the frozen candidate set using the existing semantic-relevance and recency policy.
5. **Persistent-verifier treatment:** expose the frozen verifier metadata to a predefined reranking rule that rewards verified quality and penalizes low-confidence, stale, conflicting, or misleading records. Do not make new verifier calls at query time.
6. Keep the generator model, base prompt, embedding model, candidate retrieval set, top-k, context-token budget, temperature, and answer rubric identical. Run paired tasks in randomized order.

## Measurement

Track task success, required-evidence recall, harmful-memory inclusion, unsupported-claim rate, citation/provenance correctness, retrieved-context tokens, and latency. Report paired differences with 95% bootstrap confidence intervals overall and by task family.

Definitions:

- **Required evidence:** a memory record necessary to satisfy the predefined task-success rubric from the current input and memory alone.
- **Harmful memory:** a record human-labeled stale, conflicting, or misleading that is passed into the final generation context when it is not needed to represent an unresolved conflict.
- **Harmful-memory inclusion rate:** harmful records included in final context divided by all harmful records available in the frozen candidate sets.
- **Task success:** completion of the predefined factual or executable success condition without a material error.
- **Required-evidence recall:** the fraction of required memory records present in the final generation context.
- **Persistent verifier metadata:** frozen quality, confidence, label, and verification-time fields retained after admission and used by the treatment reranker.

## Expected effort

Four to six hours for memory-bank construction, human labeling, frozen verifier scoring, paired reranking, execution, and analysis, assuming an existing memory retrieval and evaluation harness.

## Stop condition

Stop after 120 condition-task evaluations. An early quality-failure stop is allowed after at least 30 paired tasks if treatment task success or required-evidence recall is below 70%, or if admitted-record, candidate-set, model, or token-budget parity cannot be maintained, because those failures invalidate the intended comparison.
