"""
Production-ready Tavily search client.
"""

from __future__ import annotations

import logging
from typing import Any

from tavily import TavilyClient

from app.core.config import settings

logger = logging.getLogger(__name__)


class TavilySearch:
    """
    Wrapper around Tavily Search API.
    """

    def __init__(self) -> None:
        if not settings.TAVILY_API_KEY:
            raise ValueError("Missing Tavily API Key.")

        self.client = TavilyClient(api_key=settings.TAVILY_API_KEY)

    def search(
        self,
        query: str,
        max_results: int = 5,
    ) -> list[dict[str, Any]]:
        """
        Execute Tavily search.

        Returns:
            List of search result dictionaries.
        """

        try:
            response = self.client.search(
                query=query,
                max_results=max_results,
                include_answer=True,
                include_raw_content=False,
            )

            return response.get("results", [])

        except Exception:
            logger.exception("Tavily search failed.")
            return []