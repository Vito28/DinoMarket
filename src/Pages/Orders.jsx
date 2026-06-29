import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Container, Image, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { formatCurrency } from "../utils/format";
import { getOrdersForUser } from "../storage/orderStorage";

const orderStatuses = ["Semua", "Belum Bayar", "Dikemas", "Dikirim", "Selesai", "Dibatalkan"];

const statusVariant = {
  "Belum Bayar": "warning",
  Dikemas: "info",
  Dikirim: "primary",
  Selesai: "success",
  Dibatalkan: "secondary",
};

const actionLabel = {
  "Belum Bayar": "Bayar Sekarang",
  Dikemas: "Lihat Detail",
  Dikirim: "Lacak Pengiriman",
  Selesai: "Beli Lagi",
  Dibatalkan: "Lihat Detail",
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const getFirstOrderItem = (order) => order.groups?.flatMap((group) => group.items)?.[0] ?? null;

const Orders = () => {
  const [activeStatus, setActiveStatus] = useState("Semua");
  const { currentUser } = useSelector((state) => state.auth);
  const orders = useMemo(() => getOrdersForUser(currentUser?.id), [currentUser?.id]);
  const filteredOrders = useMemo(
    () =>
      activeStatus === "Semua"
        ? orders
        : orders.filter((order) => order.status === activeStatus),
    [activeStatus, orders]
  );

  return (
    <main className="page-surface">
      <Container className="py-5">
        <div className="page-heading">
          <div>
            <h1>Pesanan Saya</h1>
            <p>Pantau status pesanan dan riwayat belanja kamu.</p>
          </div>
          <Button as={Link} to="/search/all" variant="outline-primary">
            Belanja Lagi
          </Button>
        </div>

        <Card className="soft-card mb-4">
          <Card.Body className="p-2">
            <Nav variant="pills" className="status-tabs">
              {orderStatuses.map((status) => (
                <Nav.Item key={status}>
                  <Nav.Link active={activeStatus === status} onClick={() => setActiveStatus(status)}>
                    {status}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Body>
        </Card>

        {filteredOrders.length === 0 ? (
          <Card className="soft-card empty-state">
            <Card.Body>
              <FiShoppingBag />
              <h2>Belum ada pesanan.</h2>
              <p>
                {currentUser
                  ? "Pesanan yang sudah kamu checkout akan tampil di sini."
                  : "Masuk terlebih dahulu untuk melihat riwayat pesanan."}
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {!currentUser && (
                  <Button as={Link} to="/login" variant="outline-primary">
                    Masuk
                  </Button>
                )}
                <Button as={Link} to="/search/all">Mulai Belanja</Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredOrders.map((order) => {
              const firstItem = getFirstOrderItem(order);
              const extraItems = Math.max((order.summary?.items ?? 1) - 1, 0);

              return (
                <Card className="soft-card order-card" key={order.id}>
                  <Card.Body>
                    <div className="order-card-header">
                      <div>
                        <div className="small text-muted">Nomor Pesanan</div>
                        <div className="fw-semibold">{order.id}</div>
                      </div>
                      <div className="text-lg-end">
                        <div className="small text-muted">{formatDate(order.createdAt)}</div>
                        <Badge bg={statusVariant[order.status] ?? "secondary"}>{order.status}</Badge>
                      </div>
                    </div>
                    <Row className="align-items-center g-3 mt-2">
                      <Col xs="auto">
                        <Image
                          src={firstItem?.image || "/logo.png"}
                          alt={firstItem?.title || "Pesanan DinoMarket"}
                          className="order-image"
                        />
                      </Col>
                      <Col>
                        <h2 className="h6 mb-1">{firstItem?.title || "Pesanan DinoMarket"}</h2>
                        <div className="text-muted small">
                          {order.summary?.quantity ?? 0} item
                          {extraItems > 0 ? ` dari ${order.summary.items} produk` : ""}
                        </div>
                      </Col>
                      <Col md="auto" className="text-md-end">
                        <div className="text-muted small">Total Harga</div>
                        <div className="fw-bold text-primary">
                          {formatCurrency(order.summary?.finalTotal ?? 0)}
                        </div>
                      </Col>
                      <Col md="auto">
                        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                          <Button variant="outline-secondary" size="sm">
                            <FiPackage className="me-1" />
                            Detail
                          </Button>
                          <Button variant="primary" size="sm">
                            {actionLabel[order.status] ?? "Lihat Detail"}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
};

export default Orders;
