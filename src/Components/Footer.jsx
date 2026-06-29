import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Footer = () => (
  <footer className="site-footer pt-5 pb-4 mt-auto">
    <Container>
      <Row className="gy-4">
        <Col lg={3} md={6}>
          <div className="footer-brand">
            <img src="/logo.png" alt="DinoMarket logo" loading="lazy" decoding="async" />
            <span>DinoMarket</span>
          </div>
          <p>
            Marketplace modern untuk kebutuhan gadget, perangkat kerja, dan produk pilihan
            dengan pengalaman belanja yang aman dan mudah.
          </p>
          <div className="d-flex gap-3">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </Col>
        <Col lg={2} md={6}>
          <h2>Layanan Pelanggan</h2>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/help">Pusat Bantuan</Nav.Link>
            <Nav.Link as={Link} to="/search/all">Cara Belanja</Nav.Link>
            <Nav.Link as={Link} to="/help">Pengiriman</Nav.Link>
            <Nav.Link as={Link} to="/help">Pengembalian</Nav.Link>
          </Nav>
        </Col>
        <Col lg={2} md={6}>
          <h2>Tentang</h2>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">Tentang Kami</Nav.Link>
            <Nav.Link as={Link} to="/terms">Syarat dan Ketentuan</Nav.Link>
            <Nav.Link as={Link} to="/privacy">Kebijakan Privasi</Nav.Link>
          </Nav>
        </Col>
        <Col lg={2} md={6}>
          <h2>Akun</h2>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/login">Masuk</Nav.Link>
            <Nav.Link as={Link} to="/register">Daftar</Nav.Link>
            <Nav.Link as={Link} to="/orders">Pesanan Saya</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
        </Col>
        <Col lg={3} md={6}>
          <h2>Kontak</h2>
          <ul className="footer-contact">
            <li><FiPhone /> +62 812-3456-7890</li>
            <li><FiMail /> support@dinomarket.vitolab.dev</li>
            <li><FiMapPin /> Medan, Indonesia</li>
          </ul>
        </Col>
      </Row>
      <hr className="footer-divider my-4" />
      <div className="text-center footer-copy">
        &copy; {new Date().getFullYear()} DinoMarket. All rights reserved.
      </div>
    </Container>
  </footer>
);

export default Footer;
