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
    <Row>
      {data.map(product => (
          <Card onClick={() => handleProduct(product.id)}>
            <Card.Img variant="top" src={product.images[0]} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}


    </Row>
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
