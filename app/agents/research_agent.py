from __future__ import annotations

import logging

from app.graph.state import ResearchState
from app.llms.factory import get_llm
from app.prompts.research import RESEARCH_PROMPT
from app.tools.search_formatter import format_search_results
from app.tools.tavily_search import TavilySearch

logger = logging.getLogger(__name__)

llm = get_llm()
search_client = TavilySearch()


def research_agent(state: ResearchState) -> ResearchState:
    """
    Research node:
    1. Search the web using Tavily.
    2. Format search results.
    3. Ask Gemini to create a research summary.
    4. Store research notes and sources in the shared state.
    """

    query = state["query"]

    logger.info("Starting research for query: %s", query)

    # Perform web search
    search_results = search_client.search(
        query=query,
        max_results=5,
    )

    # Format search results for the LLM
    context = format_search_results(search_results)

    # Build prompt
    prompt = RESEARCH_PROMPT.format(
        query=query,
        context=context,
    )

    # Generate research summary
    response = llm.invoke(prompt)

    # Update shared state
    state["research_notes"] = response.content

    state["search_results"] = search_results

    state["sources"] = [
        result["url"]
        for result in search_results
        if result.get("url")
    ]

    state["status"] = "research_completed"

    logger.info("Research completed successfully.")

    return state