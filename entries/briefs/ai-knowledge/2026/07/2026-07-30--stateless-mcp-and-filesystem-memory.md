---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-07-30",
  "title": "Stateless MCP and the real value of filesystem memory",
  "date": "2026-07-30",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["mcp", "agent-tooling", "api-platforms", "safety-and-security", "memory", "retrieval", "evaluation", "context-engineering", "personal-knowledge-management"],
  "entities": ["Model Context Protocol", "MCP Apps", "MCP Tasks", "Multi Round-Trip Requests", "filesystem memory"],
  "references": ["reference:mcp:2026-07-28", "reference:arxiv:2607.26637"],
  "experiment": "experiment:2026-07-30:filesystem-memory-economy",
  "related": ["brief:ai-knowledge:2026-07-28"],
  "confidence": "high",
  "status": "published"
}
---

# Stateless MCP and the real value of filesystem memory

## Three meaningful changes

1. **MCP's 2026-07-28 revision replaces the stateful HTTP lifecycle with a stateless core.** The protocol removes the `initialize` handshake and protocol-level HTTP session, carries client and capability metadata with requests, and adds discovery and routing metadata intended to work with ordinary load balancing and caching infrastructure. [Primary source](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)

2. **Extensions become the standard path for capabilities outside the core.** MCP Apps can provide server-rendered interfaces, Tasks moves into an extension for long-running work, and multi-round-trip request patterns allow a stateless tool call to request additional client input without restoring transport sessions. [Primary source](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)

3. **The protocol adds stronger evolution and verification rules.** Authorization aligns more closely with OAuth and OpenID Connect deployments, features receive Active, Deprecated, and Removed lifecycle states with minimum deprecation windows, and Standards Track proposals require matching conformance scenarios before reaching Final status. [Primary source](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)

## Why they matter

**Interpretation:** MCP is moving from a connection-oriented integration protocol toward deployable infrastructure with a deliberately smaller core and independently evolving capabilities.

- **Stateless transport changes the server architecture:** remote servers can avoid sticky sessions and shared session stores, but applications must move user- or task-specific state into explicit application storage.
- **Extensions reduce pressure on the core:** builders can adopt interfaces and long-running tasks without waiting for every client and server to implement a larger mandatory protocol surface.
- **Governance becomes an implementation concern:** deprecation windows and conformance tests give teams clearer migration signals, while the breaking transport change means clients, gateways, and servers still need explicit compatibility testing.

For builders, the immediate action is to inventory any dependency on `initialize`, `Mcp-Session-Id`, unsolicited server notifications, or hard-coded error values before claiming support for the new revision.

## Knowledge-system research

A July 29 preprint systematically evaluates the increasingly common practice of storing agent memory as directories of Markdown files. Across long-conversation and embodied-task settings, the authors report that organized stores can roughly halve retrieval cost when the memory corpus becomes large, but organization quality erodes for most management agents and does not consistently improve answer quality. They also find that changing the available file and search tools can reshape the store as much as changing the model. [Primary source](https://arxiv.org/abs/2607.26637)

**Interpretation:** Hierarchical memory should not be justified by intuition alone. Its most defensible near-term benefit may be lower search cost and better inspectability, while automatic reorganization introduces its own quality and maintenance risks.

Practical takeaway: evaluate memory shape, tool harness, store health, answer quality, and retrieval cost separately; do not treat a clean directory tree as evidence of better memory performance.

## One experiment

Run the linked experiment, [Test whether organized filesystem memory reduces retrieval cost without lowering answer quality](../../../../experiments/proposed/exp-2026-07-30--filesystem-memory-economy.md), using identical content, search tools, model settings, and paired queries across an organized hierarchy and a chronological flat store.

## Risks or disagreements

- The MCP release description is maintainer-authored and emphasizes intended operational benefits; real migration cost depends on client, SDK, transport, gateway, and application-state assumptions.
- The revision is deliberately breaking. Backward-compatible SDK support does not guarantee that custom clients, servers, proxies, or observability pipelines behave correctly without testing.
- The filesystem-memory study is a new preprint. Its findings may depend on the selected agents, tools, benchmarks, corpus sizes, and definitions of organization quality.
- A human-reviewed hierarchy may outperform agent-maintained organization while understating the ongoing labor needed to keep the store current.

## Primary sources

- [Model Context Protocol: 2026-07-28 specification release](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- [Zhou et al.: Filesystem-Based Memory for LLM Agents](https://arxiv.org/abs/2607.26637)
