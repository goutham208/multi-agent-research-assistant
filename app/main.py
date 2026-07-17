from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.api.research import router as research_router
from app.core.config import settings
from app.core.logging import configure_logging

configure_logging()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Production-grade Multi-Agent Research Assistant built with FastAPI, LangGraph, OpenAI and Tavily Search.",
)

app.include_router(research_router)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", include_in_schema=False)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
    )


@app.get("/health", tags=["System"])
async def health():
    """
    Health check endpoint.
    """
    return {
        "status": "healthy",
    }


@app.get("/version", tags=["System"])
async def version():
    """
    Version endpoint.
    """
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }