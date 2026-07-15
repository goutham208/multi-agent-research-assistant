from __future__ import annotations

from langchain_core.language_models.chat_models import BaseChatModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI

from app.core.config import settings


def get_llm() -> BaseChatModel:
    """
    Create and return the configured LLM based on LLM_PROVIDER.
    """

    provider = settings.LLM_PROVIDER.lower()

    if provider == "openai":
        return ChatOpenAI(
            model=settings.OPENAI_MODEL,
            api_key=settings.OPENAI_API_KEY,
            temperature=0.2,
        )

    if provider == "gemini":
        return ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.2,
        )

    raise ValueError(
        f"Unsupported LLM_PROVIDER: {settings.LLM_PROVIDER}"
    )