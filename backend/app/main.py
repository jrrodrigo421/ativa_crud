from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router
from app.core.config import settings
from app.db.session import create_tables

app = FastAPI(
    title="Ativa CRUD API",
    description="API for Ativa CRUD application",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    create_tables()
    
@app.get("/")
async def root():
    return {"message": "Welcome to Ativa CRUD API"} 