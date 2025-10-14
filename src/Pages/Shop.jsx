import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FiShoppingBag } from "react-icons/fi";
import QuantityButton from "../Components/QuantityButton";
import PopupCart from "../Components/Popup/PopupCart";
import ProductCard from "../Components/ProductCard";
import {
  getCartItem,
  setCartItemNote,
  upsertCartItem,
} from "../storage/cartStorage";
import { formatCurrency } from "../utils/format";
import useCatalogData from "../hooks/useCatalogData";

const Shop = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { products, shops, isLoading, isError, refetch } = useCatalogData();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((item) => item.id === numericId),
    [numericId, products]
  );

  const shop = useMemo(() => {
    if (!product) {
      return null;
    }
    return (
      shops.find((shopItem) => shopItem.id === product.shop.id) ?? product.shop
    );
  }, [product, shops]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }
    return products
      .filter(
        (item) =>
          item.id !== product.id && item.shop?.id === product.shop?.id
      )
      .slice(0, 8);
  }, [product, products]);

  const existingCartItem = useMemo(
    () => getCartItem(numericId),
    [numericId]
  );

  const [quantity, setQuantity] = useState(existingCartItem?.quantity ?? 1);
  const [note, setNote] = useState(existingCartItem?.note ?? "");
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] ?? ""
  );
  const [showPopupCart, setShowPopupCart] = useState(false);

  useEffect(() => {
    setQuantity(existingCartItem?.quantity ?? 1);
    setNote(existingCartItem?.note ?? "");
  }, [existingCartItem]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const discountedPrice = useMemo(() => {
    if (!product) {
      return 0;
    }
    return product.price - product.price * (product.discount_percentage / 100);
  }, [product]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    upsertCartItem({
      productId: product.id,
      shopId: product.shop.id,
      quantity,
    });
    setCartItemNote(product.id, note);
    setShowPopupCart(true);
  };

  const closePopup = () => setShowPopupCart(false);

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="py-5 text-center d-flex flex-column align-items-center gap-3">
        <h2 className="fw-bold mb-0">Gagal memuat detail produk</h2>
        <p className="text-muted">Silakan coba memuat ulang halaman.</p>
        <Button onClick={refetch}>Muat ulang</Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2 className="fw-bold mb-3">Produk tidak ditemukan</h2>
        <p className="text-muted">
          Produk yang kamu cari mungkin sudah tidak tersedia.
        </p>
        <Button href="/" variant="primary">
          Kembali ke beranda
        </Button>
      </Container>
    );
  }

  return (
    <main>
      <Helmet>
        <title>{`${product.title} - ${shop?.name ?? "Toko"}`}</title>
        <meta
          name="description"
          content={`Belanja ${product.title} dengan diskon ${product.discount_percentage}% di ${shop?.name}.`}
        />
      </Helmet>
      <Container className="py-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/">Beranda</Breadcrumb.Item>
          <Breadcrumb.Item href={`/search/${encodeURIComponent(shop?.name ?? "shop")}`}>
            {shop?.name ?? "Toko"}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="g-5">
          <Col lg={6}>
            <Card className="border-0 shadow-sm mb-3">
              <Image
                src={selectedImage}
                alt={product.title}
                className="img-fluid rounded"
                loading="lazy"
                decoding="async"
              />
            </Card>
            <Row className="g-3">
              {product.images?.map((imageSrc, index) => (
                <Col xs={4} sm={3} key={imageSrc}>
                  <Button
                    variant={selectedImage === imageSrc ? "primary" : "outline-secondary"}
                    className="w-100 p-2"
                    onClick={() => setSelectedImage(imageSrc)}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${product.title} ${index + 1}`}
                      className="img-fluid rounded"
                      loading="lazy"
                      decoding="async"
                    />
                  </Button>
                </Col>
              ))}
            </Row>
            <Card className="border-0 bg-light shadow-sm mt-4">
              <Card.Body className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 text-start">
                <div>
                  <h6 className="fw-semibold mb-1">{shop?.name}</h6>
                  <p className="text-muted small mb-0">
                    Mitra resmi dengan ulasan terbaik.
                  </p>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="ms-sm-auto"
                  onClick={() =>
                    navigate(`/search/${encodeURIComponent(shop?.name ?? "")}`)
                  }
                >
                  Kunjungi Toko
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="d-flex flex-column gap-4">
                <div>
                  <Badge bg="success" className="mb-2">
                    {product.discount_percentage}% OFF
                  </Badge>
                  <Card.Title className="h2 fw-bold">{product.title}</Card.Title>
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-3 fw-bold text-primary">
                      {formatCurrency(discountedPrice)}
                    </span>
                    <span className="text-muted text-decoration-line-through">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="fw-semibold">Deskripsi</h5>
                  <p className="text-muted mb-0">{product.description}</p>
                </div>

                <Card className="bg-light border-0">
                  <Card.Body className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-muted">Jumlah</span>
                      <QuantityButton
                        productId={product.id}
                        value={quantity}
                        persist={false}
                        onQuantityChange={setQuantity}
                      />
                    </div>
                    <div className="ms-sm-auto">
                      <span className="text-muted small">Subtotal</span>
                      <div className="fs-5 fw-semibold text-primary">
                        {formatCurrency(discountedPrice * quantity)}
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Form.Group className="mb-0">
                  <Form.Label>Catatan untuk penjual</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Contoh: warna hitam, size M"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    maxLength={200}
                  />
                  <Form.Text muted>Opsional, maksimal 200 karakter.</Form.Text>
                </Form.Group>

                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Button
                    size="lg"
                    className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleAddToCart}
                  >
                    <FiShoppingBag />
                    Tambah ke Keranjang
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="flex-grow-1"
                    onClick={() => {
                      upsertCartItem({
                        productId: product.id,
                        shopId: product.shop.id,
                        quantity,
                      });
                      setCartItemNote(product.id, note);
                      navigate("/cart");
                    }}
                  >
                    Beli Langsung
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        {relatedProducts.length > 0 && (
          <section className="mt-5">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h3 className="h4 mb-0">Produk lain dari {shop?.name}</h3>
                <p className="text-muted mb-0">
                  Temukan produk populer lain dari toko ini.
                </p>
              </div>
              <Button
                variant="link"
                className="text-decoration-none"
                onClick={() =>
                  navigate(`/search/${encodeURIComponent(shop?.name ?? "")}`)
                }
              >
                Lihat semua
              </Button>
            </div>
            <ProductCard products={relatedProducts} variant="compact" />
          </section>
        )}
      </Container>

      {showPopupCart && (
        <PopupCart
          id={product.id}
          shopId={product.shop.id}
          image={product.images?.[1] ?? product.images?.[0]}
          alt={product.title}
          onClose={closePopup}
        />
      )}
    </main>
  );
};

export default Shop;
