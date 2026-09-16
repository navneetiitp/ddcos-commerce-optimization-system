from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.product_schema import ProductCreate, ProductResponse, ProductUpdate
from app.services.product_service import create_product, get_all_products, get_product_by_id, delete_product, update_product, update_product_price

router = APIRouter()

@router.post("/", response_model=ProductResponse, status_code=201)
def add_product(product: ProductCreate):
    try:
        return create_product(product)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create product: {e}")

@router.get("/", response_model=List[ProductResponse])
def list_products():
    return get_all_products()

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductResponse)
def edit_product(product_id: int, product_data: ProductUpdate):
    try:
        product = update_product(product_id, product_data)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update product: {e}")

@router.put("/{product_id}/price", response_model=ProductResponse)
def update_price(product_id: int, new_price: float):
    if new_price < 0:
        raise HTTPException(status_code=422, detail="Price must be non-negative")
    product = update_product_price(product_id, new_price)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/{product_id}")
def delete(product_id: int):
    if not delete_product(product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "success", "message": "Product deleted successfully"}
