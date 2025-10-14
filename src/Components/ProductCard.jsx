import { Badge, Card, Col, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/format";

const variantColumns = {
  grid: "row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4",
  compact: "row-cols-2 row-cols-sm-3 row-cols-lg-4",
};

const ProductCard = ({
  products = [],
  variant = "grid",
  showShop = true,
  onProductClick,
}) => {
  const [data, setData] = useState(products);
  const navigate = useNavigate();

  useEffect(() => {
    setData(products);
  }, [products]);

  const cardVariant = useMemo(
    () => variantColumns[variant] ?? variantColumns.grid,
    [variant]
  );

  const navigateToDetail = (product) => {
    if (onProductClick) {
      onProductClick(product);
      return;
    }
    navigate(`/shop/${product.id}`);
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">Tidak ada produk untuk ditampilkan.</h5>
      </div>
    );
  }

  return (
    <Row className={`g-4 ${cardVariant}`}>
      {data.map((product) => {
        const discountedPrice =
          product.price - product.price * (product.discount_percentage / 100);
        return (
          <Col key={product.id}>
            <Card
              className="h-100 border-0 shadow-sm product-card cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Lihat detail ${product.title}`}
              onClick={() => navigateToDetail(product)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigateToDetail(product);
                }
              }}
            >
              <div className="position-relative overflow-hidden rounded-top">
                <Card.Img
                  variant="top"
                  src={product.images?.[0]}
                  alt={product.title}
                  className="object-fit-cover"
                  loading="lazy"
                  decoding="async"
                  style={{ height: variant === "compact" ? "180px" : "220px" }}
                />
                {product.discount_percentage > 0 && (
                  <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute top-0 end-0 m-2"
                    aria-hidden="true"
                  >
                    -{product.discount_percentage}%
                  </Badge>
                )}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-semibold lh-sm text-truncate">
                  {product.title}
                </Card.Title>
                {showShop && product.shop?.name && (
                  <Card.Subtitle className="text-muted small mb-2">
                    {product.shop.name}
                  </Card.Subtitle>
                )}
                <div className="mt-auto pt-3 d-flex flex-column gap-1">
                  <span className="fw-bold text-primary">
                    {formatCurrency(discountedPrice)}
                  </span>
                  {product.discount_percentage > 0 && (
                    <span className="text-muted text-decoration-line-through small">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number.isRequired,
      discount_percentage: PropTypes.number.isRequired,
      description: PropTypes.string,
      shop: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    })
  ),
  variant: PropTypes.oneOf(["grid", "compact"]),
  showShop: PropTypes.bool,
  onProductClick: PropTypes.func,
};

export default ProductCard;
