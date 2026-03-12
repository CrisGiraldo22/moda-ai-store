from fastapi import FastAPI

app = FastAPI(
    title="fashion AI Store API",
    version="0.1.0",
    description="API for clothing store with Python, React, MySQL e IA"
)

@app.get("/")
def root():
    return {"message": "Welcome to Moda AI Store API"}

@app.get("/health")
def health():
    return {"status": "ok"}