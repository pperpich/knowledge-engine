---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-08-28",
  "title": "Restricted agent runtimes, peer messaging, and rule graphs",
  "date": "2026-08-28",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "safety-and-security", "context-engineering", "knowledge-graphs", "retrieval", "rag", "evaluation", "provenance"],
  "entities": ["Claude Code", "Restricted Mode", "cross-session messaging", "Workflow tool", "SymbolLKG"],
  "references": ["reference:anthropic:claude-code-changelog", "reference:arxiv:2608.26836"],
  "experiment": "experiment:2026-08-28:dependency-aware-rule-retrieval",
  "related": ["brief:ai-knowledge:2026-08-21"],
  "confidence": "medium",
  "status": "published"
}
---

# Restricted agent runtimes, peer messaging, and rule graphs

## Three meaningful changes

1. **Claude Code 2.1.248 adds a restricted execution profile for deliberately narrow agent authority.** `--restricted` (or `CLAUDE_CODE_RESTRICTED=1`) removes built-in command/code execution tools and `WebFetch` unless explicitly restored through `--tools`, confines file tools to the working directory, refuses `bypassPermissions`, and ignores user, project, and local settings files. The release was published August 27. [Primary source](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md) · [Release record](https://github.com/anthropics/claude-code/releases/tag/v2.1.248)

2. **Same-machine agent sessions gain a broader peer-messaging surface.** Claude Code now exposes `SendMessage` and `ListAgents` between sessions on the same machine when using Bedrock, Vertex, Foundry, or when telemetry is disabled. The same release adds validation and trust-boundary fixes around cross-session messaging, including stricter handling of invalid inbound settings and Linux user-namespace ownership. [Primary source](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)

3. **Context economy and cache stability became explicit runtime concerns.** Claude Code reduces the Workflow tool description from roughly 5.7k tokens to about 1k by moving authoring guidance into a bundled `workflow-authoring` skill. It also fixes prompt-cache invalidation caused by OAuth token refreshes re-rendering tool definitions and by `ScheduleWakeup` changing between a session and `--resume`; the former could also drop extended-thinking context. [Primary source](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)

These are three operational changes from one Claude Code release family, not three independent ecosystem signals. They are distinct from the August 27 brief's focus on interrupted-tool semantics, `/cd` context transitions, and partial/recovery status.

## Why they matter

**Interpretation:** Agent runtimes are beginning to expose three concerns that are easy to blur together—**authority**, **coordination**, and **context state**—as separate operational contracts.

- **Restricted execution:** a low-authority mode is useful for review, research, and other tasks where broad shell or web access is unnecessary. Builders can start from a narrower tool surface instead of relying only on prompt instructions to avoid dangerous actions.
- **Peer messaging:** multi-agent coordination no longer has to imply one giant shared transcript. Explicit session-to-session messages make sender, recipient, and handoff events observable, but also create another trust boundary that needs identity, lifecycle, and injection controls.
- **Context economy and cache stability:** tool schemas and framework instructions are part of the token budget and cache key. A several-thousand-token tool description or an accidental schema mutation can create recurring cost, latency, and reasoning-state churn even when application behavior is unchanged.

A practical builder takeaway is to log **effective tool authority**, **inter-session message provenance**, and **context-definition version/cache state** separately from ordinary model messages. Those fields make policy drift and unexpected token-cost changes easier to diagnose.

## Knowledge-system research

A new preprint, **SymbolLKG**, argues that semantic retrieval alone can miss structural dependencies in rule-heavy reasoning. It represents logical rules and constraints as first-class nodes in a Logical Knowledge Graph, combines topology-aware hybrid retrieval with a router to symbolic solvers, and returns explicit reasoning paths. The authors report higher accuracy than the prompting and RAG baselines they evaluate. [Primary source](https://arxiv.org/abs/2608.26836)

**Interpretation:** For policy, specification, compliance, or other rule-dense corpora, the retrieval problem may be partly topological: once one relevant rule is found, prerequisites and exceptions can matter even when they are not the most semantically similar passages to the original query. That is a narrower and more testable claim than adopting a full neuro-symbolic reasoning stack.

The paper is a recent preprint, and its reported gains combine graph representation, retrieval, routing, and symbolic solving. The linked experiment therefore isolates only dependency-aware retrieval so a positive result can be attributed to structure rather than the whole architecture.

## One experiment

Run [Test dependency-aware rule retrieval against dense RAG](../../../../experiments/proposed/exp-2026-08-28--dependency-aware-rule-retrieval.md). It uses a frozen human-reviewed rule graph and identical dense index, generator, prompt, and context budget in both conditions. The treatment adds one-hop prerequisite, exception, and dependency expansion before fixed-budget reranking; the baseline remains dense top-five retrieval.

## Risks or disagreements

- All three builder changes come from one fast-moving Claude Code release. They are concrete shipped behaviors, but should not be treated as independent evidence that every agent platform is converging on the same design.
- Restricted mode narrows the default authority surface; it is not a complete sandbox or deterministic policy engine. Explicitly named tools can restore capabilities, and external services still require their own authorization controls.
- Cross-session messaging is a same-machine coordination mechanism, not a general distributed-agent protocol. Message authenticity, stale-session behavior, and content-level prompt injection still need workload-specific controls.
- The Workflow description reduction is a maintainer-reported prompt-footprint change, not an independent benchmark of end-to-end cost or quality. Cache fixes also depend on the specific authentication and resume paths involved.
- SymbolLKG is a recent preprint. Its graph extraction, solver routing, benchmark choice, and runtime overhead may materially affect whether the architecture transfers to production knowledge systems.

## Primary sources

- [Anthropic: Claude Code changelog](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)
- [Anthropic: Claude Code v2.1.248 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.248)
- [Fan et al.: SymbolLKG — Towards Verifiable Logical Reasoning via Logical Knowledge Graph and Symbolic Solvers](https://arxiv.org/abs/2608.26836)
