---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-09-25",
  "title": "Gateway-native MCP, portable IDE agents, and iterative retrieval",
  "date": "2026-09-25",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["mcp", "agent-tooling", "api-platforms", "developer-tools", "retrieval", "reranking", "evaluation", "context-engineering"],
  "entities": ["Google", "GitHub", "Seek"],
  "references": ["reference:google:api-gateway-mcp", "reference:google:android-studio-byoa-acp", "reference:github:copilot-default-enablement-2026-09-24", "reference:arxiv:2609.28980"],
  "experiment": "experiment:2026-09-25:feedback-guided-iterative-retrieval",
  "related": [],
  "confidence": "high",
  "status": "published"
}
---

# Gateway-native MCP, portable IDE agents, and iterative retrieval

## Three meaningful changes

Google Cloud API Gateway added Public Preview support for exposing selected OpenAPI 3.x REST operations as MCP tools. [Primary source](https://developers.googleblog.com/turn-your-rest-apis-into-mcp-tools-with-google-cloud-api-gateway/)

Android Studio Rabbit 2 Canary added Bring Your Own Agent support for ACP-compatible coding agents. [Primary source](https://android-developers.googleblog.com/2026/09/build-your-way-use-any-ai-agent-in-android-studio.html)

GitHub added a global default setting for eligible generally available Copilot capabilities, including MCP-server policy. [Primary source](https://github.blog/changelog/2026-09-24-default-enablement-of-copilot-features-for-copilot-business-and-enterprise/)

## Why they matter

**Interpretation:** Agent interoperability is moving into infrastructure and IDE layers, while default governance is becoming deployment configuration.

## Knowledge-system research

Seek performs iterative retrieval by generating pseudo-passages from relevance feedback, retrieving fresh candidates, and assessing them for later rounds. The authors report gains over single-pass retrieval on TREC Deep Learning and BRIGHT; these are paper-reported results. [Primary source](https://arxiv.org/abs/2609.28980)

## One experiment

Test one feedback-guided second retrieval pass against one-pass retrieval under the same final reader context budget. See experiment:2026-09-25:feedback-guided-iterative-retrieval.

## Risks or disagreements

The Google capabilities are previews. Protocol compatibility does not guarantee equivalent agent behavior. GitHub's setting changes governance mechanics rather than feature safety. Iterative retrieval adds latency and model calls.

## Primary sources

- https://developers.googleblog.com/turn-your-rest-apis-into-mcp-tools-with-google-cloud-api-gateway/
- https://android-developers.googleblog.com/2026/09/build-your-way-use-any-ai-agent-in-android-studio.html
- https://github.blog/changelog/2026-09-24-default-enablement-of-copilot-features-for-copilot-business-and-enterprise/
- https://arxiv.org/abs/2609.28980
