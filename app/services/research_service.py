from __future__ import annotations

from app.graph.workflow import graph


class ResearchService:
    """
    Service responsible for executing the research workflow.
    """

    @staticmethod
    def run(query: str) -> dict:

        initial_state = {
            "query": query,
            "research_notes": "",
            "draft": "",
            "critique": "",
            "final_answer": "",
            "sources": [],
            "search_results": [],
            "status": "started",
            "error": "",
        }

        result = graph.invoke(initial_state)

        return {
            "query": result["query"],
            "research_notes": result["research_notes"],
            "draft": result["draft"],
            "critique": result["critique"],
            "final_answer": result["final_answer"],
            "sources": result["sources"],
            "status": result["status"],
        }