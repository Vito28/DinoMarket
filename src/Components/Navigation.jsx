import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FiGrid, FiMenu, FiPhone, FiShoppingCart } from "react-icons/fi";
import PropTypes from "prop-types";
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

  const CartBtn = ({ className = "" }) => (
    <Button
      variant="outline-primary"
      className={`position-relative cart-button ${className}`}
      onClick={() => navigate("/cart")}
      aria-label={
        cartCount > 0
          ? `Buka keranjang belanja. Terdapat ${cartCount} item`
          : "Buka keranjang kosong"
      }
    >
      <span className="visually-hidden" aria-live="polite">
        {cartCount > 0 ? `Keranjang berisi ${cartCount} item` : "Keranjang kosong"}
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
  );

  CartBtn.propTypes = {
    className: PropTypes.string,
  };

  return (
    <header className="site-header shadow-sm sticky-top">
      <div className="top-strip text-white py-2 d-none d-lg-block">
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

      <Navbar expand="lg" bg="white" className="py-2 py-lg-3">
        <Container className="nav-shell">
          <Navbar.Brand as={Link} to="/" className="brand-mark">
            <img
              src="/logo.png"
              alt="DinoMarket logo"
              className="brand-logo"
              loading="lazy"
              decoding="async"
            />
            <span>DinoMarket</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2 ms-auto d-lg-none">
            <CartBtn />
            <Navbar.Toggle aria-controls="main-navigation" className="menu-toggle" aria-label="Buka menu navigasi">
              <FiMenu />
            </Navbar.Toggle>
          </div>

          <Navbar.Collapse id="main-navigation" className="nav-collapse">
            <Nav className="main-nav me-auto">
              <NavDropdown
                title={
                  <span className="d-inline-flex align-items-center gap-2">
                    <FiGrid /> Kategori
                  </span>
                }
                id="nav-categories"
                className="nav-link-custom"
              >
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

              <Nav.Link as={NavLink} end to="/" className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`}>
                Beranda
              </Nav.Link>
              <Nav.Link as={NavLink} to="/search/trending" className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`}>
                Promo &amp; Gratis Ongkir
              </Nav.Link>
            </Nav>

            <div className="nav-actions">
              <div className="nav-search">
                <Search />
              </div>

              <div className="d-none d-lg-block">
                <CartBtn />
              </div>

              <div className="auth-area">
                <AuthButton />
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
