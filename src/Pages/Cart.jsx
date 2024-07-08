import { useSelector } from "react-redux";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import "../assets/Style/Pages/Cart.scss"

const Cart = () => {
  const { products } = useSelector((state) => state.data);
  const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];

  const car = products.reduce((acc, p) => {
    storedProducts.forEach((a) => {
      if (p.shop.id === a.shopId && p.id === a.id) {
        if (!acc[p.shop.id]) {
          acc[p.shop.id] = [];
        }
        acc[p.shop.id].push({
          id: p.id,
          price: p.price,
          title: p.title,
          image: p.images[1],
          discount_percentage: p.discount_percentage,
        });
      }
    });
    return acc;
  }, {});

  const [quantity, setQuantity] = useState(0);

  const onDecrease = (id) => {
    setQuantity(prev => prev === 0 ? 0 : JSON.parse(localStorage.getItem(`product_${id}`)) - 1)
  };

  const onIncrease = (id) => {
    setQuantity(prev => prev === 100 ? 100 : JSON.parse(localStorage.getItem(`product_${id}`)) + 1)
  };

  const onChecked = (id) => (e) => {
    const checked = e.target.checked;
    if (checked) {
      localStorage.setItem(`cart_${id}`, JSON.stringify(quantity));
    }
  };

  const onDelete = (id) => {
    const getId = JSON.parse(localStorage.getItem("stored_products"));
    const filterId = getId.filter(p_id => p_id.id !== id);
    localStorage.setItem("stored_products", JSON.stringify(filterId));
    console.log(filterId);
  }

  return (
    <Container>
      <Row>
        <Col sm="8">
          {Object.keys(car).map((shopId) => (
            <div key={shopId} className="shop-cart-container">
              <div className="shop-cart">
                <input type="checkbox" onClick={onChecked(shopId)} />
                <h2>Shop ID: {shopId}</h2>
              </div>

              {car[shopId].map((product) => (
                <div key={product.id} className="product-cart-container">
                  <input type="checkbox" onClick={onChecked(product.id)} />

                  <div className="container-cart-2">
                    <Image src={product.image} />
                    <p>Title: {product.title}</p>
                  </div>
                  <div className="container-cart-3">
                    <p className="discount">
                      Discount Percentage: $
                      {(product.price - product.price * (product.discount_percentage / 100)).toFixed(2)}
                    </p>
                    <p className="price">Price: ${product.price}</p>
                    <div className="container-cart-3-bottom">
                      <div className="add-item">
                        <div className="note-design">
                          <FiFileText className="doc" />
                          <BiPencil className="pencil" />
                        </div>

                        <GoTrash onClick={() => onDelete(product.id)} />
                        <button
                          type="button"
                          onClick={() => onDecrease(product.id)}
                          style={{ cursor: quantity === 0 ? "not-allowed" : "pointer" }}
                          aria-label="Decrease Quantity"
                          disabled={quantity === 1}
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onIncrease(product.id)}
                          style={{ cursor: quantity === 0 ? "not-allowed" : "pointer" }}
                          aria-label="Increase Quantity"
                          disabled={quantity === 100}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Col>
        <Col sm="4"></Col>
      </Row>
    </Container>
  );
};

export default Cart;
