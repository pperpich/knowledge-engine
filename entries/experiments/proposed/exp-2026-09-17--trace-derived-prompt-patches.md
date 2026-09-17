---
{
  "schema_version": 1,
  "id": "experiment:2026-09-17:trace-derived-prompt-patches",
  "title": "Trace-derived prompt patches versus manual prompt tuning",
  "date": "2026-09-17",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["context-engineering", "evaluation", "agent-tooling"],
  "references": ["reference:aws:agentcore-system-prompt-optimization"],
  "status": "proposed",
  "hypothesis": "On a fixed agent and held-out task set, prompt patches proposed from structured failure traces will improve task correctness by at least 5 percentage points over manual prompt tuning without increasing unsupported-action rate or median token use by more than 10%.",
  "success_criterion": "The trace-derived arm beats the manual baseline by at least 5 percentage points in paired task correctness, the 95% paired-bootstrap confidence interval excludes 0, absolute correctness is at least 80%, unsupported-action rate is no worse than baseline by more than 1 percentage point, and median token use rises by no more than 10%.",
  "stop_condition": "Stop and mark inconclusive if fewer than 100 eligible held-out tasks remain, any treatment sees gold answers or held-out outcomes during tuning, the agent/model/tool set differs between arms, or either arm has absolute correctness below 70% after the first 40 held-out tasks.",
  "related": ["brief:ai-knowledge:2026-09-17"]
}
---

# Trace-derived prompt patches versus manual prompt tuning

## Why this experiment

AWS now describes an optimization loop that turns production traces into proposed configuration changes and validates them with offline evaluation and online A/B testing ([primary source](https://aws.amazon.com/blogs/machine-learning/optimizing-agent-system-prompts-with-amazon-bedrock-agentcore/)). The transferable question is narrower: do structured failure traces actually produce better prompt changes than a competent manual tuning pass when everything else is fixed?

## Minimal procedure

Use one production-like agent, one frozen model version, identical tools, tool descriptions, retrieval, temperature, budgets, and execution environment. Build 60 development tasks and 120 held-out tasks across at least four task families. "Correctness" means satisfying every preregistered required outcome with no prohibited action; score it from deterministic checks where possible, otherwise blinded human adjudication.

From the same 60 development failures, create two prompt-only variants. **Manual baseline:** one engineer gets prompts, traces, and development outcomes and may edit only the system prompt. **Trace-derived treatment:** a fixed optimizer procedure receives the same material in structured trace form and proposes system-prompt edits. Cap both at three tuning rounds and the same wall-clock review budget. Freeze both prompts before held-out evaluation. Randomize arm order per task.

## Measurement

Run all eligible held-out tasks through both arms. Report paired correctness difference, unsupported-action rate, median input+output tokens, and results per task family. Use 10,000 paired bootstrap resamples for a 95% confidence interval on correctness difference. "Unsupported action" means a tool call or state mutation not authorized by the task specification. "Production order" means the preregistered task order before either arm is run.

The experiment passes only if the front-matter success criterion is met; the 80% absolute-correctness guardrail prevents a relative win between two poor systems from counting as success.

## Expected effort

About one engineer-day to assemble and freeze the task set and scoring harness, plus one half-day for tuning and paired runs if the agent already has structured traces.

## Stop condition

Apply the front-matter stop condition. Also stop for safety review if either arm executes a prohibited external side effect.