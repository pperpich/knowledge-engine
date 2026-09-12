---
{
  "schema_version": 1,
  "id": "experiment:ai-knowledge:2026-09-12:stateful-update-memory",
  "title": "Stateful update memory for sequential knowledge work",
  "date": "2026-09-12",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": [
    "memory",
    "context-engineering",
    "evaluation",
    "developer-tools"
  ],
  "references": [
    "reference:anthropic:claude-code-v2.1.261",
    "reference:arxiv:2609.11636"
  ],
  "status": "proposed",
  "hypothesis": "Across 60 paired sequential-update cases, providing a persisted structured state ledger of active constraints, accepted decisions, and provenance pointers will improve update validity by at least 10 percentage points versus a transcript-summary baseline using the same model, tools, source evidence, and prompts.",
  "success_criterion": "The treatment improves paired update validity by at least 10 percentage points with a 95% sequence-cluster bootstrap confidence interval whose lower bound is above 0; treatment update validity is at least 85%, citation precision is at least 95%, no task family is more than 5 percentage points worse than baseline, and median input-plus-output tokens increase by no more than 20%.",
  "stop_condition": "Stop and mark inconclusive if fewer than 30 paired cases complete because of harness or infrastructure failures, more than 20% of runs require manual repair, or the two variants receive different source evidence, tools, model versions, or task instructions.",
  "related": [
    "brief:ai-knowledge:2026-09-12"
  ]
}
---
# Stateful update memory for sequential knowledge work

## Why this experiment

MAPLE reports that retaining executable state across successive updates can preserve validity and useful prior search information in optimization tasks. Claude Code v2.1.269 also adds a reproducible plugin-evaluation surface. This experiment asks a narrower transfer question: does an explicit state ledger improve correctness when a knowledge task is revised repeatedly?

Definitions:

- **Production order:** the chronological order in which the four updates in a sequence are presented.
- **Baseline:** the current task prompt plus a rolling transcript summary of prior accepted outputs; no structured state artifact.
- **Treatment:** the identical prompt, model, tools, evidence packet, and transcript summary plus a persisted ledger containing `active_constraints`, `accepted_decisions`, `superseded_items`, and `provenance_pointers`.
- **Update validity:** an update is valid only if it satisfies every currently active gold constraint, preserves every non-superseded accepted decision, removes or replaces every superseded item as instructed, and introduces no contradiction with the current gold state.
- **Correctness:** the proportion of required gold facts or decisions represented correctly in the final artifact, excluding explicitly superseded items.
- **Citation precision:** the proportion of source-backed factual claims whose cited provenance pointer actually supports that claim.
- **Absolute quality guardrail:** treatment update validity must be at least 85% and citation precision at least 95%; a relative improvement cannot compensate for generally poor output.

## Minimal procedure

1. Prepare 60 four-update sequences, ten each from six task families: policy changes, API/documentation updates, project decisions, incident notes, research claims, and entity records. Each sequence has a frozen source packet and a hand-authored gold state after every update.
2. Run both variants in paired fashion on every sequence. Keep the model version, system/task prompts, tools, source packet, temperature/sampling settings, and production order identical. Randomize which variant is executed first.
3. For the treatment only, update the structured ledger after an output is accepted. The ledger may contain only information already available to the baseline through the transcript and source packet; it cannot add new evidence.
4. Score all 240 updates per variant against the gold state. Use deterministic checks where fields are structured; use a blinded rubric for free-text decisions. Record input/output tokens and any manual-repair or infrastructure failures.
5. Report paired differences overall and by task family. Bootstrap the paired difference by sequence, not by individual update, to obtain a 95% confidence interval and avoid treating correlated updates as independent.

## Measurement

Primary metric: paired difference in update-validity rate.

Secondary metrics: correctness, citation precision, contradictions per sequence, median input-plus-output tokens, and per-family update validity.

A result counts as evidence for the hypothesis only if:
- update validity improves by at least 10 percentage points;
- the 95% sequence-cluster bootstrap confidence interval for the paired improvement has a lower bound above 0;
- treatment update validity is at least 85%;
- treatment citation precision is at least 95%;
- no task family is more than 5 percentage points worse than baseline; and
- median token use increases by no more than 20%.

## Expected effort

About 4-6 hours if a reusable evaluation harness already exists: roughly 2 hours to author and review gold sequences, 1-2 hours to run both variants, and 1-2 hours to score and inspect failures.

## Stop condition

Stop and mark the experiment inconclusive if fewer than 30 paired sequences complete because of harness or infrastructure failures, more than 20% of runs require manual repair, or the variants receive different source evidence, tools, model versions, or task instructions. Stop early and mark the hypothesis unsupported if an interim review after 30 paired sequences shows treatment update validity below 75%, because the absolute-quality guardrail is then unlikely to be recoverable without changing the treatment.
