---
{
  "schema_version": 1,
  "id": "experiment:2026-08-23:memory-commitment-policy",
  "title": "Test an explicit memory-commitment gate before durable writes",
  "date": "2026-08-23",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "evaluation", "personal-knowledge-management", "context-engineering"],
  "references": ["reference:arxiv:2608.19564"],
  "status": "proposed",
  "hypothesis": "For interaction-derived candidate memories spanning stable facts, ephemeral context, freshness-sensitive claims, and ambiguity, an explicit four-way commitment policy (persist, current-context-only, verify, ask) will reduce erroneous durable persistence by at least 50% relative to a generic memory-worthiness prompt while preserving at least 85% recall of truly durable memories.",
  "success_criterion": "Across at least 80 paired scenarios, the commitment-policy treatment reduces erroneous durable persistence by at least 50% relative to baseline and to no more than 10% absolute, while achieving at least 85% durable-memory recall, at least 80% overall action accuracy, at least 90% label-to-tool agreement, and at least 70% recall for every action class.",
  "stop_condition": "Stop after 160 condition-scenario evaluations. Stop early after at least 40 paired scenarios if treatment durable-memory recall is below 60%, label-to-tool agreement is below 70%, or the two conditions do not receive identical scenario inputs and tool surfaces.",
  "related": ["brief:ai-knowledge:2026-08-23"]
}
---

# Test an explicit memory-commitment gate before durable writes

## Why this experiment

Persistent memory can fail before retrieval begins: the system may store information that was temporary, stale, ambiguous, or never appropriate to make durable. Recent work suggests that models are better at deciding to re-verify changing facts than at deciding to ask for clarification, and that stated memory decisions can diverge from the tool calls that actually mutate storage. This experiment isolates the policy decision made immediately before a durable write.

## Minimal procedure

1. Build at least 80 human-reviewed interaction scenarios, balanced across four gold actions: **persist**, **current-context-only**, **verify**, and **ask**. Include at least four content domains so one topic does not dominate the result.
2. Before evaluation, label each scenario with its gold action and a short rationale. For persist items, define the exact durable fact or preference that should be retained.
3. **Baseline:** give the frozen model a generic instruction to store user-specific information that seems useful for future interactions, with the same four structured action tools available.
4. **Treatment:** add a fixed commitment policy defining when information may be persisted, when it is limited to the current interaction, when a freshness-sensitive claim must be re-verified, and when ambiguity requires asking the user.
5. Keep the model, scenario text, temperature, system instructions outside the commitment-policy section, tool schemas, and output budget identical. Run both conditions for every scenario in randomized order.
6. Record both the model's stated action and the structured action tool it invokes. Score the structured tool call as the operational decision; use the stated label only to measure label-to-tool agreement.

## Measurement

Track overall action accuracy, per-class precision and recall, erroneous durable-persistence rate, durable-memory recall, unnecessary clarification rate, unnecessary verification rate, and label-to-tool agreement. Report paired differences with 95% bootstrap confidence intervals and an exact paired test for the erroneous-persistence outcome.

Definitions:

- **Erroneous durable persistence:** invoking the persist tool on a scenario whose gold action is current-context-only, verify, or ask.
- **Durable-memory recall:** the fraction of gold persist scenarios on which the persist tool is correctly invoked.
- **Action accuracy:** the fraction of scenarios where the invoked structured action tool matches the human-reviewed gold action.
- **Label-to-tool agreement:** the fraction of scenarios where the model's stated decision and its actual structured tool call select the same action.

## Expected effort

Three to five hours for scenario construction, gold labeling, paired execution, scoring, and analysis, assuming the four action tools can be mocked without changing a production memory store.

## Stop condition

Stop after 160 condition-scenario evaluations. An early quality-failure stop is allowed after at least 40 paired scenarios if durable-memory recall falls below 60%, label-to-tool agreement falls below 70%, or input/tool parity between conditions cannot be maintained, because those failures would make the comparison uninformative.
