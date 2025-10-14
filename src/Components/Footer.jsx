import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
    <Container>
      <Row className="gy-4">
        <Col md={4}>
          <h5 className="fw-bold">DinoMarket</h5>
          <p className="text-white-50">
            Platform e-commerce terpercaya untuk kebutuhan perangkat teknologi kamu.
            Belanja aman, cepat, dan bergaransi resmi.
          </p>
        </Col>
        <Col md={4}>
          <h6 className="fw-semibold">Jelajahi</h6>
          <Nav className="flex-column text-white-50">
            <Nav.Link as={Link} to="/#about" className="text-white-50 px-0">
              Tentang Kami
            </Nav.Link>
            <Nav.Link as={Link} to="/#support" className="text-white-50 px-0">
              Pusat Bantuan
            </Nav.Link>
            <Nav.Link as={Link} to="/#terms" className="text-white-50 px-0">
              Syarat & Ketentuan
            </Nav.Link>
            <Nav.Link as={Link} to="/#privacy" className="text-white-50 px-0">
              Kebijakan Privasi
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={4}>
          <h6 className="fw-semibold">Terhubung</h6>
          <div className="d-flex gap-3">
            <a href="https://facebook.com" className="text-white-50 fs-5" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="text-white-50 fs-5" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="text-white-50 fs-5" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="text-white-50 fs-5" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </Col>
      </Row>
      <hr className="border-secondary my-4" />
      <div className="text-center text-white-50">
        &copy; {new Date().getFullYear()} DinoMarket. All rights reserved.
      </div>
    </Container>
  </footer>
);

export default Footer;
