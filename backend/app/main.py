from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.root.root import router as root_router
from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.products import router as products_router
from app.db.session import Base, engine
from app.models.product import Product

tags_metadata = [
    {
        "name": "Root",
        "description": "Base API endpoints"
    },
    {
        "name": "Health",
        "description": "API status and database connectivity checks"
    },
    {
        "name": "Products",
        "description": "Store product management"
    }
]

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Moda AI Store API",
    version="0.1.0",
    description="API for a clothing store built with Python, React, MySQL, and AI integration",
    openapi_tags=tags_metadata
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root_router)
app.include_router(health_router)
app.include_router(products_router)