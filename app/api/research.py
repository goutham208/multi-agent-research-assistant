from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.research_service import ResearchService

router = APIRouter(
    prefix="/research",
    tags=["Research"],
)


class ResearchRequest(BaseModel):
    query: str


@router.post("")
async def research(request: ResearchRequest) -> dict:
    """
    Execute the research workflow.
    """

    return ResearchService.run(request.query)