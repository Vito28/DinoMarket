
import { useMemo } from "react";
import { Badge, Button, Card, Col, Container, Nav, Placeholder, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { formatCurrency } from "../utils/format";
import useCatalogData from "../hooks/useCatalogData";

const Home = () => {
  const navigate = useNavigate();
  const { products, shops, isLoading, isError, refetch } = useCatalogData();

  const highlightProduct = useMemo(() => {
    if (!products || products.length === 0) {
      return null;
    }
    return [...products].sort(
      (a, b) => b.discount_percentage - a.discount_percentage
    )[0];
  }, [products]);

  const hotDeals = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    return [...products]
      .sort((a, b) => b.discount_percentage - a.discount_percentage)
      .slice(0, 8);
  }, [products]);

  const editorChoice = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    return [...products].sort((a, b) => a.price - b.price).slice(0, 8);
  }, [products]);

  const curatedVendors = useMemo(() => (shops ? shops.slice(0, 4) : []), [shops]);

  if (isLoading) {
    return (
      <main>
        <section className="bg-light py-5">
          <Container className="d-flex flex-column gap-4">
            <Placeholder as="div" animation="glow" className="w-75">
              <Placeholder xs={12} className="display-6" />
            </Placeholder>
            <Placeholder as="div" animation="glow" className="w-50">
              <Placeholder xs={12} />
            </Placeholder>
          </Container>
        </section>
        <section className="py-5">
          <Container className="text-center">
            <Spinner animation="border" variant="primary" role="status" />
          </Container>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <section className="py-5">
          <Container className="text-center d-flex flex-column align-items-center gap-3">
            <h2 className="fw-bold">Gagal memuat katalog</h2>
            <p className="text-muted mb-0">
              Kami mengalami kendala saat mengambil data produk. Silakan coba lagi.
            </p>
            <Button onClick={refetch}>Muat Ulang</Button>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={6}>
              <Badge bg="warning" text="dark" className="mb-3">
                Koleksi Premium
              </Badge>
              <h1 className="display-6 fw-bold text-primary hero-heading">
                Gadget Pilihan Untuk Tingkatkan Produktivitas
              </h1>
              <p className="text-muted lead mb-4">
                Temukan perangkat favoritmu dengan harga terbaik dan garansi penuh.
                Kami kurasi produk berkualitas dari brand terpercaya untuk
                menunjang gaya hidup modern.
              </p>
              {highlightProduct && (
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Button
                    size="lg"
                    onClick={() => navigate(`/shop/${highlightProduct.id}`)}
                  >
                    Lihat {highlightProduct.title}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={() => navigate("/search/promo")}
                  >
                    Jelajahi Promo
                  </Button>
                </div>
              )}
            </Col>
            <Col md={6}>
              {highlightProduct && (
                <Card className="border-0 shadow-sm">
                  <Row className="g-0 align-items-center">
                    <Col md={6}>
                      <Card.Img
                        src={highlightProduct.images?.[1]}
                        alt={highlightProduct.title}
                        className="img-fluid rounded-start"
                        loading="lazy"
                        decoding="async"
                      />
                    </Col>
                    <Col md={6}>
                      <Card.Body>
                        <Card.Title>{highlightProduct.title}</Card.Title>
                        <Card.Text className="text-muted small">
                          Diskon spesial {highlightProduct.discount_percentage}% hanya
                          untuk minggu ini.
                        </Card.Text>
                        <div className="d-flex flex-column">
                          <span className="fs-4 fw-bold text-primary">
                            {formatCurrency(
                              highlightProduct.price -
                                highlightProduct.price *
                                  (highlightProduct.discount_percentage / 100)
                            )}
                          </span>
                          <span className="text-muted text-decoration-line-through">
                            {formatCurrency(highlightProduct.price)}
                          </span>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 border-bottom">
        <Container>
          <Row className="align-items-center gy-3">
            <Col md={6}>
              <h2 className="h4 mb-0">Belanja dari Toko Favorit</h2>
              <p className="text-muted small mb-0">
                Pilih brand resmi untuk pengalaman belanja tanpa khawatir.
              </p>
            </Col>
            <Col md={6}>
              <Nav className="justify-content-md-end flex-wrap gap-2">
                {curatedVendors.map((shop) => (
                  <Nav.Item key={shop.id}>
                    <Nav.Link
                      onClick={() =>
                        navigate(`/search/${encodeURIComponent(shop.name)}`)
                      }
                      className="px-3 py-2 border rounded-pill text-secondary"
                    >
                      {shop.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container className="d-flex flex-column gap-5">
          <div>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="h3 mb-0">Hot Deals</h2>
                <p className="text-muted mb-0">
                  Penawaran terbaik dengan diskon spesial hari ini.
                </p>
              </div>
              <Button
                variant="link"
                className="text-decoration-none"
                onClick={() => navigate("/search/deals")}
              >
                Lihat semua
              </Button>
            </div>
            <ProductCard products={hotDeals} />
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="h3 mb-0">Pilihan Editor</h2>
                <p className="text-muted mb-0">
                  Perangkat terbaik untuk kamu yang ingin upgrade setup.
                </p>
              </div>
              <Button
                variant="link"
                className="text-decoration-none"
                onClick={() => navigate("/search/recommendation")}
              >
                Lihat rekomendasi lain
              </Button>
            </div>
            <ProductCard products={editorChoice} />
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Home;
