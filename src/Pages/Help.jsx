import { Accordion, Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FiCreditCard, FiHelpCircle, FiPackage, FiRefreshCw, FiSearch, FiTruck, FiUser, FiTag } from "react-icons/fi";

const categories = [
  ["Akun & Login", FiUser],
  ["Pesanan", FiPackage],
  ["Pembayaran", FiCreditCard],
  ["Pengiriman", FiTruck],
  ["Pengembalian Barang", FiRefreshCw],
  ["Promo & Voucher", FiTag],
];

const faqs = [
  ["Bagaimana cara membuat akun?", "Klik tombol Daftar di navigasi, isi nama, email, dan password minimal 6 karakter."],
  ["Bagaimana cara melacak pesanan?", "Buka Pesanan Saya, pilih pesanan berstatus Dikirim, lalu tekan Lacak Pengiriman."],
  ["Bagaimana cara membatalkan pesanan?", "Pesanan yang belum diproses dapat dibatalkan dari detail pesanan atau melalui customer service."],
  ["Mengapa checkout tidak bisa dilakukan?", "Checkout membutuhkan akun aktif dan minimal satu produk dipilih di keranjang."],
  ["Bagaimana cara menghubungi customer service?", "Hubungi support@dinomarket.vitolab.dev atau WhatsApp +62 812-3456-7890 pada jam operasional."],
];

const Help = () => (
  <main className="page-surface">
    <section className="help-hero">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <h1>Pusat Bantuan</h1>
            <p>Temukan jawaban untuk kendala belanja, pembayaran, pengiriman, dan akun.</p>
            <Form role="search">
              <InputGroup className="help-search">
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control placeholder="Cari bantuan..." aria-label="Cari bantuan" />
                <Button>Cari</Button>
              </InputGroup>
            </Form>
          </Col>
          <Col lg={5} className="d-none d-lg-block">
            <div className="help-visual"><FiHelpCircle /></div>
          </Col>
        </Row>
      </Container>
    </section>
    <Container className="py-5">
      <Row className="g-3 mb-5">
        {categories.map(([label, Icon]) => (
          <Col md={4} sm={6} key={label}>
            <Card className="soft-card help-category">
              <Card.Body>
                <Icon />
                <span>{label}</span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="g-4">
        <Col lg={8}>
          <h2 className="h4 fw-bold mb-3">Pertanyaan Populer</h2>
          <Accordion className="soft-accordion">
            {faqs.map(([question, answer], index) => (
              <Accordion.Item eventKey={String(index)} key={question}>
                <Accordion.Header>{question}</Accordion.Header>
                <Accordion.Body>{answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
        <Col lg={4}>
          <Card className="soft-card support-card">
            <Card.Body>
              <h2>Butuh bantuan langsung?</h2>
              <p>Email: support@dinomarket.vitolab.dev</p>
              <p>WhatsApp: +62 812-3456-7890</p>
              <p>Jam operasional: Senin-Jumat, 09.00-18.00 WIB</p>
              <Button variant="primary">Hubungi Support</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Help;
