---
{
  "schema_version": 1,
  "id": "experiment:2026-08-20:conflict-preserving-memory-merge",
  "title": "Test conflict-preserving memory merge against last-write-wins",
  "date": "2026-08-20",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "knowledge-graphs", "provenance", "evaluation"],
  "references": ["reference:arxiv:2608.16357"],
  "status": "proposed",
  "hypothesis": "On paired memory-update episodes containing paraphrases, related facts, contradictions, and stale updates, a conflict-preserving merge policy will achieve at least 90% contradiction recall and reduce silent overwrites by at least 80% relative to last-write-wins while keeping downstream question-answer accuracy within 3 percentage points of baseline and at or above 85%.",
  "success_criterion": "Across at least 120 labeled update episodes and 60 paired downstream questions, the conflict-preserving treatment achieves at least 90% contradiction recall, no more than 5% silent-overwrite rate, at least 85% QA accuracy, and QA accuracy no more than 3 percentage points below last-write-wins; report paired 95% bootstrap intervals and per-update-type results.",
  "stop_condition": "Stop after all 240 condition-episode evaluations and 120 condition-question evaluations. Stop early after half the workload if treatment contradiction recall is below 70% or QA accuracy is below 75%, or if implementation errors prevent the two conditions from receiving identical source updates.",
  "related": ["brief:ai-knowledge:2026-08-20"]
}
---

# Test conflict-preserving memory merge against last-write-wins

## Why this experiment

MELD argues that contradictions in distributed agent memory should survive as explicit state for later adjudication rather than being silently overwritten. This experiment isolates that semantic choice without attempting to reproduce MELD's networking, CRDT, or routing stack.

## Minimal procedure

1. Build at least 120 labeled memory-update episodes across at least four domains. Include balanced cases of semantic duplicate, compatible elaboration, related-but-distinct fact, direct contradiction, and stale update.
2. For every episode, define the original claim, incoming claim, timestamps, provenance IDs, and a human-labeled expected relationship before running either condition.
3. **Last-write-wins baseline:** store one value per normalized claim key and replace the prior value whenever a newer update arrives.
4. **Conflict-preserving treatment:** use fixed thresholds and one frozen embedding/NLI stack to classify each incoming update as merge, relate, conflict, insert, or reject. Preserve both claims and their provenance when the relationship is conflict.
5. Replay the identical update sequence into both stores. Do not change thresholds, models, normalization, or timestamps between conditions.
6. Create at least 60 downstream questions whose answers depend on the stored claims, including at least 20 questions where a contradiction should be surfaced rather than collapsed to one answer.
7. Score update classification against the human labels and score downstream answers with a predefined factual and contradiction-awareness rubric, blinded to condition when practical.

## Measurement

Track contradiction recall and precision, silent-overwrite rate, false-merge rate, provenance completeness, duplicate live-record count, downstream QA accuracy, contradiction-aware answer accuracy, and storage growth. Report paired differences with 95% bootstrap confidence intervals overall and by update type.

Definitions:

- **Contradiction:** two claims that cannot both be true under the same scoped entity, property, time, and context according to the human label.
- **Silent overwrite:** an incoming contradictory claim replaces the prior claim without retaining an explicit conflict relationship or both provenance records.
- **Conflict-preserving merge:** a policy that keeps contradictory claims as separate records linked by an explicit conflict relation rather than choosing a winner automatically.
- **Last-write-wins:** the newer timestamped value replaces the older value for the same normalized claim key.
- **QA accuracy:** the response satisfies the predefined answer key; contradiction-bearing questions require acknowledging the unresolved conflict when the evidence remains inconsistent.

## Expected effort

Four to six hours for episode construction, labeling, implementation of the two merge policies, paired replay, downstream evaluation, and analysis.

## Stop condition

Stop after 240 condition-episode evaluations and 120 condition-question evaluations. An early quality-failure stop is allowed after half the workload if contradiction recall is below 70% or QA accuracy is below 75%. Also stop if source-update parity between conditions cannot be maintained, because that would invalidate the comparison.
