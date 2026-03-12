from fastapi import APIRouter
from sqlalchemy import text

from app.db.session import engine

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("/")
def check_health():
    return {"status": "ok"}

@router.get("/db")
def check_db():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return {"status": "ok", "database": "connected"}