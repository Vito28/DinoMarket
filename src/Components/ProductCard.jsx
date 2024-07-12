import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/Style/Components/ProductCard.scss"

const ProductCard = ({ products }) => {
  const [data, setData] = useState(products || []);

  useEffect(() => {
    setData(products);
  }, [products]);

  const navigate = useNavigate()
  const handleProduct = (id) => {
    navigate(`/shop/${id}`)
  }
  return (
    <div>
    <Row>
      {data.map(product => (
        <Col lg={3} md={4} sm={6} xs={12} key={product.id}>
          <Card onClick={() => handleProduct(product.id)}>
            <Card.Img variant="top" src={product.images[0]} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <b>${product.price} </b> <span>${parseFloat((product.price - (product.price * (product.discount_percentage / 100))).toFixed(2))}</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Link to="/">Card Link</Card.Link>
              <Card.Link to="/">Another Link</Card.Link>
            </Card.Footer>
          </Card>
        </Col>
      ))}


    </Row></div>
  );
};

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ProductCard;
