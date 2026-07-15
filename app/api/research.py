from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from app.graph.workflow import graph

router = APIRouter(prefix="/research", tags=["Research"])


class ResearchRequest(BaseModel):
    query: str


@router.post("")
async def research(request: ResearchRequest) -> dict:
    """
    Execute the complete LangGraph workflow.
    """

    initial_state = {
        "query": request.query,
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