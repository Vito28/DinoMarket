import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductsNotInCart = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm text-center py-5">
        <Card.Body className="d-flex flex-column gap-3 align-items-center">
          <Card.Title className="fs-3 fw-bold">
            Keranjang belanja kamu masih kosong
          </Card.Title>
          <Card.Text className="text-muted">
            Jelajahi koleksi produk kami dan temukan perangkat favoritmu.
          </Card.Text>
          <Button size="lg" onClick={() => navigate("/")}>
            Mulai Belanja
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductsNotInCart;
