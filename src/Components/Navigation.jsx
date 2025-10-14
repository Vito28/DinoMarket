import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FiPhone, FiShoppingCart } from "react-icons/fi";
import Search from "./Search";
import AuthButton from "./AuthButton";
import { CART_UPDATED_EVENT, getCartItems } from "../storage/cartStorage";
import useCatalogData from "../hooks/useCatalogData";

const Navigation = () => {
  const navigate = useNavigate();
  const { shops, isLoading } = useCatalogData();
  const [cartCount, setCartCount] = useState(() =>
    getCartItems().reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(
        getCartItems().reduce((total, item) => total + item.quantity, 0)
      );
    };

    window.addEventListener(CART_UPDATED_EVENT, updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const featuredShops = useMemo(
    () => shops.slice(0, 6).map((shop) => ({ id: shop.id, name: shop.name })),
    [shops]
  );

  return (
    <header className="shadow-sm">
      <div className="bg-dark text-white py-2 d-none d-lg-block">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 small promo-banner-text">
            <span>Gratis ongkir pesanan &gt; $50</span>
            <span>Voucher ekstra 10% untuk member baru</span>
          </div>
          <div className="d-flex align-items-center gap-2 small">
            <FiPhone />
            <span>Hubungi kami: +62 812-3456-7890</span>
          </div>
        </Container>
      </div>
      <Navbar expand="lg" bg="white" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary d-flex align-items-center gap-2">
            <img
              src="/logo.png"
              alt="DinoMarket logo"
              className="brand-logo"
              loading="lazy"
              decoding="async"
            />
            DinoMarket
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navigation" />
          <Navbar.Collapse id="main-navigation" className="gap-3">
            <Nav className="me-auto d-flex align-items-lg-center gap-lg-3">
              <NavDropdown title="Kategori Toko" id="nav-categories">
                {isLoading && (
                  <NavDropdown.Item disabled>Memuat toko...</NavDropdown.Item>
                )}
                {featuredShops.map((shop) => (
                  <NavDropdown.Item
                    key={shop.id}
                    onClick={() => navigate(`/search/${encodeURIComponent(shop.name)}`)}
                  >
                    {shop.name}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/search/all">
                  Semua Produk
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={NavLink}
                end
                to="/"
                className={({ isActive }) =>
                  `nav-link nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                Beranda
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/search/trending"
                className={({ isActive }) =>
                  `nav-link nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                Promo &amp; Gratis Ongkir
              </Nav.Link>
            </Nav>
            <div className="flex-grow-1" style={{ minWidth: "280px" }}>
              <Search />
            </div>
            <div className="d-flex align-items-center gap-3 ms-lg-3">
              <Button
                variant="outline-primary"
                className="position-relative rounded-circle cart-button"
                onClick={() => navigate("/cart")}
                aria-label={
                  cartCount > 0
                    ? `Buka keranjang belanja. Terdapat ${cartCount} item di dalam keranjang`
                    : "Buka keranjang belanja. Keranjang kosong"
                }
              >
                <span className="visually-hidden" aria-live="polite">
                  {cartCount > 0
                    ? `Keranjang berisi ${cartCount} item`
                    : "Keranjang masih kosong"}
                </span>
                <FiShoppingCart />
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 end-0 translate-middle"
                    aria-hidden="true"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <AuthButton />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
