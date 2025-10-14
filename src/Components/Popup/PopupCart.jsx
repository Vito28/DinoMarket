import { useMemo } from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FiCheckCircle } from "react-icons/fi";
import ProductCard from "../ProductCard";
import useCatalogData from "../../hooks/useCatalogData";

const PopupCart = ({ id, shopId, image, alt, onClose }) => {
  const navigate = useNavigate();
  const { products, isLoading } = useCatalogData();

  const otherProducts = useMemo(
    () =>
      (products ?? [])
        .filter(
          (product) =>
            product.id !== id && product.shop?.id === shopId
        )
        .slice(0, 4),
    [products, id, shopId]
  );

  return (
    <Modal
      show
      onHide={onClose}
      centered
      size="lg"
      backdrop="static"
      aria-labelledby="cart-popup-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="cart-popup-title" className="d-flex align-items-center gap-2">
          <FiCheckCircle className="text-success fs-4" />
          Produk ditambahkan
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="align-items-center gy-3">
          <Col sm="auto">
            <Image
              src={image}
              alt={alt}
              rounded
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
            />
          </Col>
          <Col>
            <h6 className="mb-1">{alt}</h6>
            <p className="text-muted small mb-0">
              Produk berhasil ditambahkan ke keranjangmu.
            </p>
          </Col>
          <Col sm="auto">
            <Button variant="primary" onClick={() => navigate("/cart")}>
              Lihat Keranjang
            </Button>
          </Col>
        </Row>

        {!isLoading && otherProducts.length > 0 && (
          <div className="mt-4">
            <h5 className="mb-3">Produk lain dari toko ini</h5>
            <ProductCard
              products={otherProducts}
              variant="compact"
              onProductClick={(product) => {
                onClose();
                navigate(`/shop/${product.id}`);
              }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Lanjutkan Belanja
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PopupCart.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  shopId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupCart;
