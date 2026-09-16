from app.database.connection import SessionLocal
from app.models.product_model import Product


# 🔥 Create Product
def create_product(product):
    db = SessionLocal()

    try:
        # Validation
        if product.price < 0 or product.stock < 0:
            raise ValueError("Price and stock must be non-negative")

        db_product = Product(
            name=product.name,
            price=product.price,
            stock=product.stock
        )

        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        return db_product

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()


# 🔥 Get All Products
def get_all_products():
    db = SessionLocal()

    try:
        return db.query(Product).all()

    finally:
        db.close()


# 🔥 Get Product By ID
def get_product_by_id(product_id: int):
    db = SessionLocal()

    try:
        return (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

    finally:
        db.close()


# 🔥 Update Product
def update_product(product_id: int, product_data):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            return None

        # Validation
        if product_data.price < 0:
            raise ValueError("Price must be non-negative")

        if product_data.stock < 0:
            raise ValueError("Stock must be non-negative")

        product.name = product_data.name
        product.price = product_data.price
        product.stock = product_data.stock

        db.commit()
        db.refresh(product)

        return product

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()


# 🔥 Delete Product
def delete_product(product_id: int):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            return False

        db.delete(product)
        db.commit()

        return True

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()
    # 🔥 Update Product Price
def update_product_price(product_id: int, new_price: float):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            return None

        product.price = new_price

        db.commit()
        db.refresh(product)

        return product

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.close()    