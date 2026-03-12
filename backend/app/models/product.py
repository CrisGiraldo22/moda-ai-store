from sqlalchemy import Boolean, Column, Float, Integer, String

from app.db.session import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    category = Column(String(100), nullable=False)
    size = Column(String(20), nullable=True)
    color = Column(String(50), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)