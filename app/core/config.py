from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from .env.
    """

    # ==========================
    # LLM Provider
    # ==========================
    LLM_PROVIDER: str = "openai"

    # ==========================
    # OpenAI
    # ==========================
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-5-mini"

    # ==========================
    # Google Gemini
    # ==========================
    GOOGLE_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"

    # ==========================
    # Tavily
    # ==========================
    TAVILY_API_KEY: str

    # ==========================
    # App
    # ==========================
    APP_NAME: str = "Multi-Agent Research Assistant"
    APP_VERSION: str = "1.0.0"
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()