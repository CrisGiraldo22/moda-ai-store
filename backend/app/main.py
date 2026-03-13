from fastapi import FastAPI

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

app.include_router(root_router)
app.include_router(health_router)
app.include_router(products_router)