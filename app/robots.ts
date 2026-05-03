import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers (Google, Bing, etc.)
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Explicitly welcome AI crawlers / answer engines so we show up
      // in ChatGPT, Claude, Perplexity, Google AI Overviews, etc.
      {
        userAgent: [
          "GPTBot", // OpenAI ChatGPT
          "OAI-SearchBot", // OpenAI search
          "ChatGPT-User", // ChatGPT browsing
          "ClaudeBot", // Anthropic Claude
          "Claude-Web", // Anthropic Claude web browsing
          "anthropic-ai", // Older Anthropic crawler
          "PerplexityBot", // Perplexity AI
          "Perplexity-User", // Perplexity user-agent
          "Google-Extended", // Google Bard / Gemini
          "Applebot-Extended", // Apple Intelligence
          "CCBot", // Common Crawl (used by many AI)
          "Meta-ExternalAgent", // Meta AI
          "Meta-ExternalFetcher", // Meta AI
          "Bytespider", // ByteDance / TikTok AI
          "DuckAssistBot", // DuckDuckGo AI
          "Amazonbot", // Amazon Alexa / AI
          "Cohere-AI", // Cohere
          "MistralAI-User", // Mistral
        ],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
