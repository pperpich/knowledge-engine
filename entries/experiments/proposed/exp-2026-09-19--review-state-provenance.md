---
{
  "schema_version": 1,
  "id": "experiment:2026-09-19:review-state-provenance",
  "title": "Structured review-state provenance versus stateless re-review",
  "date": "2026-09-19",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["evaluation", "memory", "provenance"],
  "references": ["reference:github:copilot-weekly-2026-09-18"],
  "status": "proposed",
  "hypothesis": "Across iterative pull-request revisions, carrying a structured ledger of prior findings and their resolution evidence will reduce repeated or contradictory review findings by at least 30% without lowering true-defect recall by more than 3 percentage points versus stateless full re-review.",
  "success_criterion": "On 80 paired multi-revision pull-request cases, the stateful arm reduces repeated-or-contradictory finding rate by at least 30% relative with a paired-bootstrap 95% confidence interval excluding 0%, while true-defect recall is at least 80% in both arms and the stateful-minus-stateless recall difference is no worse than -3 percentage points; no defect-severity subgroup may regress by more than 5 points.",
  "stop_condition": "Stop and invalidate the run if fewer than 80 eligible paired cases remain, either arm receives different code or tool access, the finding ledger contains adjudicated gold labels, or reviewer/model/prompt settings drift between arms; stop the treatment as harmful if interim adjudication after 40 cases shows stateful true-defect recall below 75% or a severe-defect recall regression greater than 10 points.",
  "related": ["brief:ai-knowledge:2026-09-19"]
}
---

# Structured review-state provenance versus stateless re-review

## Why this experiment

GitHub's September 18 Copilot review update makes prior findings and their later resolution explicit across review rounds. That suggests a narrower knowledge-system question: does preserving structured review state reduce reviewer churn without causing stale state to hide real regressions? [GitHub Copilot weekly releases — September 14](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/)

## Minimal procedure

Use 80 historical or synthetic pull-request cases with at least three revisions and a frozen adjudicated defect set. Each case is evaluated in production order: revision 1, revision 2, then revision 3. Run the same reviewer model, prompt, tools, token budget, and code snapshot in two paired arms.

Baseline means stateless full re-review: each revision is reviewed with no prior review findings. Treatment means stateful review: after each revision, persist only a structured ledger containing finding ID, file/location, concise claim, severity, status, and non-gold resolution evidence from the code diff. The ledger may mark a finding open, resolved, or uncertain; it must not contain the adjudicated answer key or future-revision information.

A "true defect" is an issue in the frozen adjudicated defect set for that exact revision. A "repeated finding" is materially the same valid or invalid finding emitted again after it was already emitted and the relevant code did not change. A "contradictory finding" reverses a prior disposition without code evidence that could explain the reversal. "Resolution evidence" is a concrete diff or code location supporting why a prior finding is no longer applicable.

## Measurement

Blind two adjudicators to arm identity. Measure true-defect recall, precision, repeated-finding rate, contradictory-finding rate, severe-defect recall, review tokens, and review latency per revision. Resolve adjudicator disagreements before analysis. Report paired per-case differences, severity subgroups, and 95% confidence intervals from 10,000 paired bootstrap resamples.

The primary comparison is repeated-or-contradictory finding rate. The quality guardrail is true-defect recall: both arms must reach at least 80%, treatment may trail baseline by no more than 3 percentage points, and no severity subgroup may regress by more than 5 points. This prevents a low-output reviewer from "winning" merely by producing fewer findings.

## Expected effort

About one engineer-day to assemble cases and harnesses, plus one to two reviewer-days for blinded adjudication and disagreement resolution.

## Stop condition

Stop and invalidate the experiment if fewer than 80 paired eligible cases remain, arm inputs or tools diverge, gold labels leak into the ledger, or model/prompt configuration changes. At the preregistered 40-case safety check, stop the treatment as harmful if true-defect recall is below 75% or severe-defect recall is more than 10 points below baseline.
