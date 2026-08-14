---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-08-14",
  "title": "Agent SDK defaults, resume state, and compiled memory",
  "date": "2026-08-14",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "mcp", "safety-and-security", "memory", "personal-knowledge-management", "retrieval", "context-engineering", "evaluation"],
  "entities": ["OpenAI Agents SDK", "GPT-5.6 Luna", "Model Context Protocol", "Muscle Memory"],
  "references": ["reference:openai:agents-python-v0.20.0", "reference:openai:agents-js-v0.15.0", "reference:arxiv:2608.08995"],
  "experiment": "experiment:2026-08-14:compiled-personalization-memory",
  "related": [],
  "confidence": "high",
  "status": "published"
}
---

# Agent SDK defaults, resume state, and compiled memory

## Three meaningful changes

1. **OpenAI's Agents SDK changed its implicit model default in both major language implementations.** Python v0.20.0 and JavaScript v0.15.0, both published August 11, now use `gpt-5.6-luna` when an application does not explicitly select a model; explicit agent or run configuration still takes precedence. The JavaScript release also requires `openai` 7.2 or later for applications that supply their own OpenAI client. [Python release](https://github.com/openai/openai-agents-python/releases/tag/v0.20.0) · [JavaScript release](https://github.com/openai/openai-agents-js/releases/tag/v0.15.0)

2. **The coordinated releases move local MCP integration onto the 2026-07-28 generation without forcing standard applications to build their own compatibility bridge.** The Python SDK supports MCP Python SDK v1 and v2 across stdio, SSE, and Streamable HTTP. The JavaScript SDK uses the MCP TypeScript SDK v2 client, negotiates the 2026-07-28 protocol when available, and retains compatible fallback for legacy servers. OpenAI explicitly warns that customized Python MCP HTTP authentication or client factories may need new major-version HTTP types or an `mcp<2` pin. [Python release](https://github.com/openai/openai-agents-python/releases/tag/v0.20.0) · [JavaScript release](https://github.com/openai/openai-agents-js/releases/tag/v0.15.0)

3. **Paused and resumed agent runs now carry more explicit durable state, while sandbox credential authority is reconstructed more conservatively.** Both SDKs add pending user input that survives `RunState` serialization until a safe resumed model request. The releases also tighten tool replay identity and sandbox mount handling; credential-bearing mounts require explicit exposure acknowledgement rather than trusting serialized authority on resume. [Python release](https://github.com/openai/openai-agents-python/releases/tag/v0.20.0) · [JavaScript release](https://github.com/openai/openai-agents-js/releases/tag/v0.15.0)

## Why they matter

**Interpretation:** Mature agent frameworks are making previously implicit runtime behavior—model choice, protocol compatibility, resumable input, replay identity, and credential authority—more explicit because these details become production contracts once agents run unattended or survive process boundaries.

- **Pin model defaults when behavior matters.** An SDK upgrade can now change the model behind an otherwise unchanged agent configuration. Teams that require stable cost, latency, or evaluation behavior should select and regression-test models explicitly rather than inherit the framework default.
- **Treat MCP SDK versions as an application dependency, not just a transport detail.** Standard connections get a smoother migration path, but custom authentication and transport code can sit directly on a major-version boundary.
- **Persistence needs authority semantics, not only serialization.** Saving a paused run is useful only if new input, completed tool calls, approvals, and credentials resume with the right identity and without silently expanding privilege.

The practical builder takeaway is to add upgrade tests around implicit defaults and resume boundaries: record the resolved model, MCP protocol path, pending input, approved tool invocation identity, and effective sandbox mounts before and after an SDK upgrade.

## Knowledge-system research

An August 10 preprint, **Muscle Memory for Agents: Compile not Merely Retrieve**, argues that recurring personalization should sometimes be compiled into purpose-built specialist behavior instead of repeatedly retrieving historical examples into a general agent's context. Its reference implementation uses a Harvest → Analyze → Augment → Evaluate pipeline to identify recurring patterns, distinguish behavioral preferences from task patterns, create quality-gated specialists, and match new tasks to them. [Primary source](https://arxiv.org/abs/2608.08995)

The authors evaluate 90 held-out scenarios across five personas. A compiled specialist fires in 36 cases; the augmented assistant wins 32 of those 36 comparisons, with a reported +2.05 personalization gain and -0.28 accuracy cost on a 1–4 scale. [Primary source](https://arxiv.org/abs/2608.08995)

**Interpretation:** The useful distinction is between memory as *evidence to retrieve* and memory as *behavior to compile*. Repeated format, depth, scope, and workflow preferences may be cheaper and more reliable as stable specialist instructions, while changing facts and source-grounded knowledge still benefit from retrieval. The paper does not establish that compilation should replace retrieval generally; it identifies a regime worth testing separately.

## One experiment

Run [Test compiled personalization against retrieval-only memory](../../../../experiments/proposed/exp-2026-08-14--compiled-personalization-memory.md). It compares a frozen top-five retrieval baseline with one precompiled specialist instruction per recurring task category, using the same historical examples, generator, tools, held-out tasks, and gold category routing. The experiment measures whether compilation lowers recurring personalization-context cost and improves preference adherence without sacrificing task correctness.

## Risks or disagreements

- The three builder changes come from one coordinated OpenAI SDK release across Python and JavaScript, so they are distinct migration concerns rather than three independent ecosystem signals.
- The implicit-model change affects only applications that do not explicitly configure a model. Well-pinned production deployments should see no model change from this release alone.
- OpenAI maintains compatibility for standard MCP connection paths, but the Python release explicitly describes the dependency migration as potentially breaking for customized local HTTP transports.
- Durable `RunState` and safer mount contracts reduce specific resume and credential hazards; they do not provide application-level exactly-once execution or eliminate the need to threat-model tool authority.
- Muscle Memory is a recent preprint. Its strongest reported comparison is based on only 36 specialist-fired cases across five synthetic personas, so the result should be independently tested on real recurring workflows before adopting the architecture broadly.

## Primary sources

- [OpenAI Agents SDK for Python v0.20.0](https://github.com/openai/openai-agents-python/releases/tag/v0.20.0)
- [OpenAI Agents SDK for JavaScript v0.15.0](https://github.com/openai/openai-agents-js/releases/tag/v0.15.0)
- [Omran et al.: Muscle Memory for Agents — Compile not Merely Retrieve](https://arxiv.org/abs/2608.08995)
