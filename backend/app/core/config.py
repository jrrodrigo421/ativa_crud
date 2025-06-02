import os
import logging
from typing import Any, Dict, List, Optional

from pydantic import AnyHttpUrl, BaseSettings, validator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/ativa_db"
    )
    
    CORS_ORIGINS: list = [
        "https://ativa-crud.vercel.app",
        "http://localhost:3000",
    ]
    
    @validator("DATABASE_URL")
    def validate_database_url(cls, v: str) -> str:
        safe_url = v
        if "@" in v:
            parts = v.split("@")
            proto_user_pass = parts[0]
            if ":" in proto_user_pass:
                last_colon_idx = proto_user_pass.rindex(":")
                safe_url = proto_user_pass[:last_colon_idx] + ":****@" + "@".join(parts[1:])
        
        logger.info(f"URL do banco de dados validada: {safe_url}")
        
        if v.startswith("postgres://"):
            v = v.replace("postgres://", "postgresql://", 1)
            logger.info("URL convertida de postgres:// para postgresql://")
        
        # Verifica se a URL tem formato de DSN completo
        if not ("://" in v and "@" in v):
            logger.warning(f"URL do banco de dados não está no formato padrão: {safe_url}")
        
        return v
    
    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings() 