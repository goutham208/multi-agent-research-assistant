from __future__ import annotations

from typing import Any, TypedDict


class ResearchState(TypedDict):
    """
    Shared state across all LangGraph agents.
    """

    query: str

    research_notes: str

    draft: str

    critique: str

    final_answer: str

    # Final URLs returned to the user
    sources: list[str]

    # Raw Tavily results for downstream agents
    search_results: list[dict[str, Any]]

    status: str

    error: str