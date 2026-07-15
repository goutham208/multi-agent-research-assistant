"""
Utilities for formatting Tavily search results for LLM consumption.
"""

from __future__ import annotations

from typing import Any


def format_search_results(results: list[dict[str, Any]]) -> str:
    """
    Convert Tavily search results into structured context for the LLM.
    """

    if not results:
        return "No relevant web search results were found."

    sections: list[str] = []

    for index, item in enumerate(results, start=1):
        title = item.get("title", "Untitled")
        url = item.get("url", "")
        content = item.get("content", "")

        section = (
            f"Source {index}\n"
            f"Title: {title}\n"
            f"URL: {url}\n"
            f"Content:\n{content}\n"
        )

        sections.append(section)

    return "\n\n".join(sections)