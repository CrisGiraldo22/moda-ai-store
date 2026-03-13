from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    description: str | None = Field(default=None, max_length=500)
    price: float = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    category: str = Field(..., min_length=2, max_length=100)
    size: str | None = Field(default=None, max_length=20)
    color: str | None = Field(default=None, max_length=50)
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int

    model_config = {
        "from_attributes": True
    }