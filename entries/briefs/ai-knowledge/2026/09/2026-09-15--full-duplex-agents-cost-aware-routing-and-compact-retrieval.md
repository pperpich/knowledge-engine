---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-09-15",
  "title": "Full-duplex agents, cost-aware routing, and compact retrieval",
  "date": "2026-09-15",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "api-platforms", "model-releases", "evaluation", "memory", "context-engineering", "retrieval", "reranking"],
  "entities": ["OpenAI", "GPT-Live-1", "GitHub", "GitHub Copilot", "Salesforce", "Agentforce", "PolDense", "EuroDense"],
  "references": ["reference:openai:gpt-live-1-api", "reference:github:copilot-auto-selection-tiers", "reference:salesforce:agentforce-long-horizon-runtime", "reference:arxiv:2609.12913"],
  "experiment": "experiment:ai-knowledge:2026-09-15:query-adaptive-retrieval-routing",
  "related": ["experiment:ai-knowledge:2026-09-15:query-adaptive-retrieval-routing"],
  "confidence": "medium",
  "status": "published"
}
---

# Full-duplex agents, cost-aware routing, and compact retrieval

## Three meaningful changes

1. **OpenAI released GPT-Live-1 in the API as a full-duplex voice front end that can delegate deeper reasoning and tool work to a backend model.** OpenAI says the model listens and speaks concurrently, supports interruptions and turn detection, and can pair with models such as GPT-6 Astra for deeper work. It is priced at $0.05 per minute for the front-end voice layer. OpenAI reports a 30-percentage-point gain over GPT-Realtime-2.1 on its Full Duplex Bench; that benchmark result is vendor-reported. [Primary source](https://openai.com/index/introducing-gpt-live-1-in-the-api/)

2. **GitHub exposed cost-quality policy as a first-class control for automatic model routing.** On September 14, Copilot Auto added efficiency, balance, and intelligence tiers. GitHub says all three tiers draw from the same available model set but change how Auto weighs cost, quality, and response time for each prompt; billing follows the model actually selected. The feature is rolling out in VS Code, Copilot CLI, and the GitHub Copilot app. [Primary source](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/)

3. **Salesforce introduced a long-horizon Agentforce runtime built around persistent progress rather than one-session completion.** Salesforce says the runtime combines memory across sessions, durable execution for resumption and course correction, and dynamic steering from user feedback. Hunter is the first agent using it. Salesforce says customer-built long-horizon agents will come later, so that capability is not yet treated here as generally available. [Primary source](https://www.salesforce.com/ap/news/press-releases/2026/09/14/ph-salesforce-expands-agentforce-with-a-new-portfolio-of-ai-agents-built-for-high-value-work/)

## Why they matter

**Interpretation:** the agent stack is separating into clearer control planes. GPT-Live-1 treats real-time conversation as a specialized front end while delegating expensive cognition behind it. Copilot exposes a routing objective instead of forcing users to pick one model. Agentforce treats persistent state and resumability as runtime primitives. Together, these releases point toward systems that choose *how much capability to spend, where, and for how long* rather than sending every interaction through one fixed model-and-context path.

For builders, this changes evaluation design. A single model score is increasingly insufficient: routing policy, front-end behavior, persistence semantics, and recovery behavior can materially change cost and correctness even when the underlying model set is unchanged. Instrument route choice, state transitions, tool delegation, and end-to-end task success as separate variables.

## Knowledge-system research

A late-captured September 11 preprint, **Parameter-Efficient Retrievers for Polish and European Languages**, tests whether smaller dense retrievers can retain strong retrieval quality through cross-lingual alignment, relational knowledge distillation, and contrastive fine-tuning with teacher-generated supervision. The authors evaluate 41 Polish and 150 multilingual retrieval tasks and report that PolDense-1B outperforms evaluated retrievers up to 9B parameters, while EuroDense-435M ranks first among evaluated sub-1B systems on task- and language-averaged performance. [Primary source](https://arxiv.org/abs/2609.12913)

**Interpretation:** this is useful evidence for a tiered retrieval architecture. If compact retrievers can handle a large fraction of routine queries, a knowledge system can reserve expensive reranking or larger retrieval models for ambiguous or difficult cases, mirroring the cost-quality routing now appearing at the model layer.

**Timing and uncertainty:** the paper predates the previous brief and is included because it was not captured in that run, not because it appeared after it. It is an arXiv preprint with author-reported results concentrated on Polish and European-language retrieval; it is not evidence that the same quality-efficiency frontier will hold for this repository's corpus or query distribution.

## One experiment

Run **Query-adaptive retrieval routing**. Freeze 300 queries across six topic families and compare the current production retrieval-plus-reranking order with a router that sends straightforward queries to one compact retrieval path and difficult queries to the unchanged production path. Keep corpus, judgments, models, and candidate counts fixed.

The treatment passes only if it cuts median retrieval compute cost by at least 25%, loses no more than 0.01 mean nDCG@10, keeps the lower bound of a paired-bootstrap 95% confidence interval above -0.02, and maintains at least 0.70 mean nDCG@10 in every topic family. See the linked experiment entry for reproducible definitions and stop conditions.

## Risks or disagreements

- OpenAI's Full Duplex Bench improvement is a vendor-reported evaluation. Full-duplex interaction quality can depend heavily on acoustics, language, telephony infrastructure, interruption patterns, and the backend model paired with the voice layer.
- Copilot's three tiers expose an optimization preference, but GitHub does not disclose the router's decision function. Builders should not infer that an "intelligence" tier always chooses the largest model; GitHub explicitly says simple prompts may still route to smaller models.
- Salesforce's long-horizon runtime is currently evidenced through Salesforce's own product announcement, with Hunter as the first named deployment. Future customer-built long-horizon support should not be evaluated as a current platform capability.
- The compact-retriever result is preprint-stage and multilingual-domain-specific. Routing can create hidden topic regressions, which is why the experiment requires per-topic absolute quality guardrails rather than aggregate parity alone.

## Primary sources

- OpenAI, **Build more natural voice experiences with GPT-Live-1 in the API**, September 15, 2026: https://openai.com/index/introducing-gpt-live-1-in-the-api/
- GitHub, **Configure cost and quality in Copilot auto model selection**, September 14, 2026: https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/
- Salesforce, **Salesforce Expands Agentforce With a New Portfolio of AI Agents Built for High-Value Work**, September 14, 2026: https://www.salesforce.com/ap/news/press-releases/2026/09/14/ph-salesforce-expands-agentforce-with-a-new-portfolio-of-ai-agents-built-for-high-value-work/
- Dadas et al., **Parameter-Efficient Retrievers for Polish and European Languages**, arXiv:2609.12913, September 11, 2026: https://arxiv.org/abs/2609.12913