import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard";
import { FaTimes } from 'react-icons/fa';
import "./PopupCart.scss"


const PopupCart = ({ id, shopId, image, alt, onClose }) => {
  console.log(id);
  const navigate = useNavigate();
  const { products } = useSelector(state => state.data);
  const otherProducts = products.filter(product => product.id !== id && product.shop.id !== shopId);

  return (
    <div className="container-popup-cart">
      <div className="popup-cart">
        <h1>Item Successfully Added</h1>
        <FaTimes onClick={onClose} />
        <Row>
          <Col>

            <div className="product-card">
              <img src={image} alt={alt} />
              <p>{alt}</p>
              <button onClick={() => navigate('/cart')}>View Cart</button>
            </div>


          </Col>
        </Row>
        <Row>
          <Col>

            <div className="other-product">
              <ProductCard products={otherProducts} onClick={onClose}/>
            </div>

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PopupCart