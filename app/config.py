from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    app_name: str = "KHALIDAI"
    environment: str = "development"
    debug: bool = True
    database_url: str = "sqlite:///./khalidai.db"
    secret_key: str = "change-me-in-production"
    model_provider: str = "openai"
    model_name: str = "gpt-4o-mini"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
