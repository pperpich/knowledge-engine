---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-09-11",
  "title": "Managed Agent Harnesses, Portable Plugins, and Execution-Learned Skill Retrieval",
  "date": "2026-09-11",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "api-platforms", "developer-tools", "evaluation", "knowledge-graphs", "mcp", "retrieval"],
  "entities": ["OpenAI Agents API", "Google Cloud Developer Plugin", "Agent Plugins", "GitHub Copilot", "SE-GoS"],
  "references": ["reference:openai:agents-api-launch", "reference:google-cloud:developer-plugin-ai-coding-agents", "reference:agent-plugins:spec-v1", "reference:github:mai-code-1-flash-deprecation", "reference:paper:se-gos:2609.08228"],
  "experiment": "experiment:2026-09-11:trace-weighted-skill-reranking",
  "related": ["experiment:2026-09-11:trace-weighted-skill-reranking"],
  "confidence": "high",
  "status": "published"
}
---

# Managed Agent Harnesses, Portable Plugins, and Execution-Learned Skill Retrieval

## Three meaningful changes

1. **OpenAI launched the Agents API in public beta as a managed Codex-style harness for long-running agents.** The September 10 launch lets developers create agent sessions by specifying a model, tools, environment, and input while OpenAI operates the harness. OpenAI documents automatic context compaction for long sessions, tool search plus programmatic tool calling, MCP support, and parallel subagents. Compute can run in an OpenAI-hosted sandbox, on developer infrastructure, or with supported sandbox partners. The API is available to all developers in public beta; OpenAI says there is no separate Agents API fee beyond model and tool usage. [Primary source: OpenAI](https://openai.com/index/introducing-the-agents-api/)

2. **Google Cloud published an installable developer plugin that bundles skills with MCP configuration across multiple coding-agent clients.** Google's September 10 `google-cloud-developer` plugin packages Cloud-specific skills, guardrails, and configuration for the Developer Knowledge MCP server. Google provides installation paths for Antigravity CLI, Claude Code, and Codex CLI. The package follows Agent Plugins v1.0.0, whose current specification is explicitly marked **Working Draft** and defines a portable directory format with `plugin.json`, Agent Skills under `skills/`, and MCP server configuration in `mcp.json`. [Primary sources: Google Cloud](https://cloud.google.com/blog/topics/developers-practitioners/introducing-the-google-cloud-developer-plugin-for-ai-coding-agents), [Agent Plugins specification](https://agent-plugins.org/specification)

3. **GitHub removed MAI-Code-1-Flash from every Copilot surface and directs users to MAI-Code-1.1-Flash.** On September 10, GitHub deprecated MAI-Code-1-Flash across Copilot Chat, inline edits, ask and agent modes, and code completions. Enterprise administrators may need to enable the replacement model through Copilot model policies before it becomes available to users. [Primary source: GitHub](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated/)

## Why they matter

**Interpretation:** The Agents API moves a large part of agent-runtime engineering from application code into a managed, versioned harness. For builders, that can reduce bespoke work around compaction, tool discovery, sandbox lifecycle, and subagent orchestration, but it also makes harness behavior a platform dependency that should be versioned and regression-tested alongside the model. [Primary source: OpenAI](https://openai.com/index/introducing-the-agents-api/)

**Interpretation:** Google's plugin is a concrete cross-client test of capability portability: one package can carry reusable instructions and MCP wiring into several agent environments instead of requiring separate integration formats. The important boundary is security: Agent Plugins standardizes packaging and discovery, but the specification states that it does not itself sandbox plugin subprocesses. Client/runtime policy still has to constrain execution. [Primary sources: Google Cloud](https://cloud.google.com/blog/topics/developers-practitioners/introducing-the-google-cloud-developer-plugin-for-ai-coding-agents), [Agent Plugins specification](https://agent-plugins.org/specification)

**Interpretation:** GitHub's model retirement is another reason to keep model identity behind configuration and evaluation gates rather than embedding a specific model into durable workflows. The replacement path can also be governance-dependent because enterprise administrators may need to enable the successor model. [Primary source: GitHub](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated/)

## Knowledge-system research

An uncaptured September 8 preprint, **SE-GoS: Self-Evolving Graph-of-Skills for Skill Library at Scale**, treats a large reusable skill library as a retrieval graph that can improve from execution history. Starting from an existing Graph-of-Skills, SE-GoS uses past execution traces to update graph topology, edge weights, and retrieval-facing skill descriptions without training the underlying language model. Across three models on SkillsBench, the authors report consistent task-reward improvements; in one representative setting, one evolution round raised reward from 52.4% to 59.4%, reduced input tokens by roughly one third relative to loading the full skill library, and transferred to a disjoint held-out split with a 5.4-point gain over the static graph baseline. [Primary source: arXiv](https://arxiv.org/abs/2609.08228)

**Interpretation:** The useful idea is that execution history can become retrieval metadata rather than remaining dead telemetry. A skill graph can record which relationships repeatedly help successful tasks and use that evidence to change future selection. That is especially relevant as skills and plugin catalogs grow, because loading everything defeats progressive disclosure. The paper's headline result does **not** isolate edge weighting: topology, weights, and descriptions change together, so the proposed experiment below tests only the narrower edge-weighting claim. [Primary source: arXiv](https://arxiv.org/abs/2609.08228)

## One experiment

Run a paired **trace-weighted skill reranking** test. Freeze one skill library, its descriptions, its dependency graph, the model, prompt, and top-5 skill budget. Collect 120 development executions under the static graph and derive a smoothed success rate for every traversed edge using only those development outcomes. Baseline uses the original graph scores. Treatment multiplies each traversed edge score by `1 + 0.5 * (2p - 1)`, where `p = (successful_uses + 1) / (total_uses + 2)`, then returns the same top-5 budget. Evaluate 100 paired held-out tasks with preregistered required-skill labels. Success requires at least +0.05 absolute end-task success with a 95% paired-bootstrap interval above zero, at least +0.08 required-skill Recall@5, treatment task success at least 0.75, Recall@5 at least 0.85, no topic subgroup losing more than 0.05, and mean input tokens no more than 5% above baseline. See `experiment:2026-09-11:trace-weighted-skill-reranking`. [Research motivation: arXiv](https://arxiv.org/abs/2609.08228)

## Risks or disagreements

- The Agents API is in public beta. OpenAI says it will iterate quickly before general availability, so current harness behavior should not be treated as a frozen long-term contract. [Primary source: OpenAI](https://openai.com/index/introducing-the-agents-api/)
- Agent Plugins v1.0.0 is currently a Working Draft. Its package contract is useful for portability experiments, but builders should expect specification and client-conformance changes. The specification also does not provide sandboxing by itself. [Primary source: Agent Plugins specification](https://agent-plugins.org/specification)
- GitHub announced the MAI-Code-1-Flash retirement in advance; September 10 is the actual removal date, not the first notice. The material delta today is enforcement of the retirement across Copilot surfaces. [Primary source: GitHub](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated/)
- SE-GoS is a preprint with author-reported results on SkillsBench. Its reported gains bundle topology evolution, edge-weight evolution, and description evolution, so they should not be attributed to any one mechanism without ablation. [Primary source: arXiv](https://arxiv.org/abs/2609.08228)

## Primary sources

- [OpenAI: Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)
- [Google Cloud: Introducing the Google Cloud Developer Plugin for AI Coding Agents](https://cloud.google.com/blog/topics/developers-practitioners/introducing-the-google-cloud-developer-plugin-for-ai-coding-agents)
- [Agent Plugins Specification v1.0.0](https://agent-plugins.org/specification)
- [GitHub: MAI-Code-1-Flash deprecated](https://github.blog/changelog/2026-09-10-mai-code-1-flash-deprecated/)
- [arXiv: SE-GoS: Self-Evolving Graph-of-Skills for Skill Library at Scale](https://arxiv.org/abs/2609.08228)
