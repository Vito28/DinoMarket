import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import { formatCurrency } from "../utils/format";
import { clearCart } from "../storage/cartStorage";

const FORM_STORAGE_KEY = "checkout_form_state";

const REQUIRED_FIELDS = ["fullName", "phone", "addressLine", "city", "postalCode"];

const INITIAL_FORM_STATE = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  postalCode: "",
  shippingNote: "",
};

const PAYMENT_OPTIONS = [
  {
    id: "bank_transfer",
    label: "Transfer Bank",
    description: "Pembayaran via ATM / mBanking. Diproses dalam 1x24 jam.",
    fee: 0,
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    description: "OVO, GoPay, Dana, ShopeePay. Diskon 2% otomatis.",
    discountPercentage: 0.02,
  },
  {
    id: "credit_card",
    label: "Kartu Kredit / Debit",
    description: "Visa, Mastercard. Biaya layanan 1.5%.",
    fee: 1.5,
  },
];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [formState, setFormState] = useState(() => {
    if (typeof window === "undefined") {
      return INITIAL_FORM_STATE;
    }

    try {
      const persisted = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
      if (persisted && typeof persisted === "object") {
        return {
          ...INITIAL_FORM_STATE,
          ...persisted,
        };
      }
    } catch {
      // ignore malformed cache
    }

    return INITIAL_FORM_STATE;
  });

  const checkoutData = useMemo(() => {
    if (location.state?.groups?.length) {
      return location.state;
    }

    try {
      const stored = JSON.parse(localStorage.getItem("checkout_payload"));
      if (stored?.groups?.length) {
        return stored;
      }
    } catch {
      // ignore malformed storage
    }

    return null;
  }, [location.state]);

  useEffect(() => {
    if (!checkoutData) {
      navigate("/cart", { replace: true });
    }
  }, [checkoutData, navigate]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formState));
  }, [formState]);

  useEffect(() => {
    if (!checkoutData) {
      return;
    }

    if (checkoutData.summary.shipping === 0 && shippingMethod === "standard") {
      setShippingMethod("pickup");
    }
  }, [checkoutData, shippingMethod]);

  if (!checkoutData) {
    return null;
  }

  const shippingOptions = useMemo(() => {
    const baseFee = checkoutData.summary.shipping ?? 0;
    const minimumStandardFee = baseFee > 0 ? baseFee : 4.5;

    return [
      {
        id: "standard",
        label: "Reguler (2-5 hari)",
        description: "JNE / SiCepat reguler. Estimasi tiba 2-5 hari kerja.",
        fee: minimumStandardFee,
      },
      {
        id: "express",
        label: "Kilat (1-2 hari)",
        description: "Pengiriman prioritas dengan asuransi penuh.",
        fee: minimumStandardFee + 5,
      },
      {
        id: "pickup",
        label: "Ambil di toko",
        description: "Ambil langsung di warehouse kami tanpa ongkir.",
        fee: 0,
      },
    ];
  }, [checkoutData.summary.shipping]);

  const shippingSelection = useMemo(
    () => shippingOptions.find((option) => option.id === shippingMethod) ?? shippingOptions[0],
    [shippingMethod, shippingOptions]
  );

  const paymentSelection = useMemo(
    () => PAYMENT_OPTIONS.find((option) => option.id === paymentMethod) ?? PAYMENT_OPTIONS[0],
    [paymentMethod]
  );

  const summary = useMemo(() => {
    const baseSubtotal = checkoutData.summary.discountedTotal;
    const basePromoDiscount = checkoutData.summary.promoDiscount;
    const shippingFee = shippingSelection?.fee ?? 0;
    const paymentFee = paymentSelection?.fee ?? 0;
    const paymentDiscount = paymentSelection?.discountPercentage
      ? baseSubtotal * paymentSelection.discountPercentage
      : 0;

    const finalTotal = Math.max(
      0,
      baseSubtotal + shippingFee + paymentFee - basePromoDiscount - paymentDiscount
    );

    return {
      baseSubtotal,
      basePromoDiscount,
      shippingFee,
      paymentFee,
      paymentDiscount,
      finalTotal,
    };
  }, [checkoutData.summary, paymentSelection, shippingSelection]);

  const isFormComplete = useMemo(
    () =>
      REQUIRED_FIELDS.every((field) => {
        const value = formState[field];
        return typeof value === "string" && value.trim().length > 0;
      }),
    [formState]
  );

  const isReadyToPay = isFormComplete && Boolean(shippingSelection) && Boolean(paymentSelection);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
    setErrors((prev) => {
      if (!prev.shippingMethod) {
        return prev;
      }
      const next = { ...prev };
      delete next.shippingMethod;
      return next;
    });
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrors((prev) => {
      if (!prev.paymentMethod) {
        return prev;
      }
      const next = { ...prev };
      delete next.paymentMethod;
      return next;
    });
  };

  const validateForm = useCallback(() => {
    const nextErrors = {};

    if (!formState.fullName.trim()) {
      nextErrors.fullName = "Nama penerima wajib diisi.";
    }

    const phoneCandidate = formState.phone.trim();
    if (!phoneCandidate) {
      nextErrors.phone = "Nomor telepon wajib diisi.";
    } else if (!/^[+0-9][0-9\s-]{7,14}$/.test(phoneCandidate)) {
      nextErrors.phone = "Gunakan 8-15 digit angka (boleh diawali +62).";
    }

    if (!formState.addressLine.trim()) {
      nextErrors.addressLine = "Alamat lengkap belum diisi.";
    }

    if (!formState.city.trim()) {
      nextErrors.city = "Kota/kecamatan wajib diisi.";
    }

    const postalCandidate = formState.postalCode.trim();
    if (!postalCandidate) {
      nextErrors.postalCode = "Kode pos wajib diisi.";
    } else if (!/^[0-9]{5}$/u.test(postalCandidate)) {
      nextErrors.postalCode = "Kode pos harus 5 digit angka.";
    }

    if (!shippingMethod) {
      nextErrors.shippingMethod = "Pilih salah satu metode pengiriman.";
    }

    if (!paymentMethod) {
      nextErrors.paymentMethod = "Pilih metode pembayaran.";
    }

    return nextErrors;
  }, [formState, paymentMethod, shippingMethod]);

  const handleFakePayment = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    clearCart();
    localStorage.removeItem("checkout_payload");
    localStorage.removeItem(FORM_STORAGE_KEY);
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2500);
  };

  return (
    <Container className="py-5">
      {showSuccess && (
        <div className="mb-4">
          <Card className="border-0 shadow-sm success-popup">
            <Card.Body className="text-center py-5">
              <FiCheckCircle className="display-5 mb-3 text-success" />
              <h2 className="h4 fw-bold mb-2">Pembayaran Berhasil!</h2>
              <p className="text-muted mb-0">
                Terima kasih sudah berbelanja. Pesananmu sedang kami proses.
              </p>
            </Card.Body>
          </Card>
        </div>
      )}
      <Row className="mb-4">
        <Col>
          <h1 className="h3 fw-bold">Checkout</h1>
          <p className="text-muted mb-0">
            Menyelesaikan {checkoutData.summary.items} produk (
            {checkoutData.summary.quantity} pcs) dari{" "}
            {checkoutData.groups.length} toko berbeda.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xl={8} className="d-flex flex-column gap-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold mb-3">Alamat Pengiriman</h5>
              <Row className="g-3">
                <Col lg={6}>
                  <Form.Group controlId="checkout-full-name">
                    <Form.Label>Nama penerima</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Contoh: Andi Pratama"
                      value={formState.fullName}
                      onChange={handleFieldChange}
                      isInvalid={Boolean(errors.fullName)}
                      autoComplete="name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group controlId="checkout-phone">
                    <Form.Label>Nomor telepon</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="+62 812 3456 7890"
                      value={formState.phone}
                      onChange={handleFieldChange}
                      isInvalid={Boolean(errors.phone)}
                      autoComplete="tel"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="checkout-address">
                    <Form.Label>Alamat lengkap</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="addressLine"
                      rows={3}
                      placeholder="Jalan, nomor rumah, RT/RW"
                      value={formState.addressLine}
                      onChange={handleFieldChange}
                      isInvalid={Boolean(errors.addressLine)}
                      autoComplete="street-address"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addressLine}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group controlId="checkout-city">
                    <Form.Label>Kota / Kecamatan</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Contoh: Medan"
                      value={formState.city}
                      onChange={handleFieldChange}
                      isInvalid={Boolean(errors.city)}
                      autoComplete="address-level2"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group controlId="checkout-postal">
                    <Form.Label>Kode pos</Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      placeholder="Kode pos"
                      value={formState.postalCode}
                      onChange={handleFieldChange}
                      isInvalid={Boolean(errors.postalCode)}
                      autoComplete="postal-code"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.postalCode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="checkout-note">
                    <Form.Label>Catatan pengiriman (opsional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="shippingNote"
                      placeholder="Contoh: harap hubungi sebelum pengantaran"
                      value={formState.shippingNote}
                      onChange={handleFieldChange}
                      maxLength={200}
                    />
                    <Form.Text muted>Maksimal 200 karakter.</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex flex-column gap-3">
              <div>
                <h5 className="fw-semibold mb-1">Metode Pengiriman</h5>
                <p className="text-muted small mb-0">
                  Pilih jasa kirim yang sesuai dengan kebutuhanmu.
                </p>
              </div>
              <div className="d-flex flex-column gap-2">
                {shippingOptions.map((option) => (
                  <Form.Check
                    type="radio"
                    name="shippingMethod"
                    key={option.id}
                    id={`shipping-${option.id}`}
                    value={option.id}
                    label={
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">
                          {option.label} - {option.fee === 0 ? "Gratis" : formatCurrency(option.fee)}
                        </span>
                        <span className="text-muted small">{option.description}</span>
                      </div>
                    }
                    checked={shippingMethod === option.id}
                    onChange={handleShippingChange}
                    isInvalid={Boolean(errors.shippingMethod)}
                  />
                ))}
                {errors.shippingMethod && (
                  <div className="invalid-feedback d-block">{errors.shippingMethod}</div>
                )}
              </div>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm">
          <Card.Body className="d-flex flex-column gap-3">
            <div>
              <h5 className="fw-semibold mb-1">Metode Pembayaran</h5>
              <p className="text-muted small mb-0">
                Pembayaran aman dengan berbagai metode yang tersedia.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              {PAYMENT_OPTIONS.map((option) => (
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  key={option.id}
                  id={`payment-${option.id}`}
                  value={option.id}
                  label={
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">{option.label}</span>
                      <span className="text-muted small">{option.description}</span>
                    </div>
                  }
                  checked={paymentMethod === option.id}
                  onChange={handlePaymentChange}
                  isInvalid={Boolean(errors.paymentMethod)}
                />
              ))}
              {errors.paymentMethod && (
                <div className="invalid-feedback d-block">{errors.paymentMethod}</div>
              )}
            </div>
          </Card.Body>
        </Card>

        {checkoutData.groups.map((group) => (
          <Card className="border-0 shadow-sm" key={group.shop.id ?? group.shop.name}>
            <Card.Header className="bg-white fw-semibold d-flex justify-content-between align-items-center">
              <span>{group.shop.name}</span>
              <span className="text-muted small">
                {group.items.length} produk - {group.totals.quantity} pcs
              </span>
            </Card.Header>
            <ListGroup variant="flush">
              {group.items.map((item) => (
                <ListGroup.Item key={item.productId} className="py-3">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div className="fw-semibold">{item.title}</div>
                      <div className="text-muted small">
                        Qty {item.quantity} - {item.discount}% OFF
                      </div>
                      {item.note && (
                        <div className="text-muted small fst-italic mt-1">
                          Catatan: {item.note}
                        </div>
                      )}
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold text-primary">
                        {formatCurrency(item.discountedPrice * item.quantity)}
                      </div>
                      <div className="small text-muted text-decoration-line-through">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Footer className="bg-white d-flex justify-content-between">
              <span className="text-muted small">Subtotal</span>
              <span className="fw-semibold">{formatCurrency(group.totals.discountedTotal)}</span>
            </Card.Footer>
          </Card>
        ))}
      </Col>
      <Col xl={4}>
        <Card className="border-0 shadow-sm sticky-top" style={{ top: "6rem" }}>
          <Card.Body className="d-flex flex-column gap-3">
            <h5 className="fw-semibold mb-0">Ringkasan Pembayaran</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal produk</span>
              <span>{formatCurrency(summary.baseSubtotal)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Ongkir ({shippingSelection.label})</span>
              <span>{summary.shippingFee === 0 ? "Gratis" : formatCurrency(summary.shippingFee)}</span>
            </div>
            {summary.paymentFee > 0 && (
              <div className="d-flex justify-content-between">
                <span>Biaya layanan ({paymentSelection.label})</span>
                <span>{formatCurrency(summary.paymentFee)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between text-success">
              <span>Promo</span>
              <span>
                {summary.basePromoDiscount > 0
                  ? `-${formatCurrency(summary.basePromoDiscount)}`
                  : "-"}
              </span>
            </div>
            {summary.paymentDiscount > 0 && (
              <div className="d-flex justify-content-between text-success">
                <span>Diskon pembayaran</span>
                <span>-{formatCurrency(summary.paymentDiscount)}</span>
              </div>
            )}
            {checkoutData.promoMessage && (
              <div className="small text-muted">{checkoutData.promoMessage}</div>
            )}
            <Card className="bg-light border-0">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Total Bayar</span>
                <span className="fs-5 fw-bold text-primary">
                  {formatCurrency(summary.finalTotal)}
                </span>
              </Card.Body>
            </Card>
            <Button
              variant="primary"
              size="lg"
              onClick={handleFakePayment}
              disabled={showSuccess || !isReadyToPay}
            >
              {showSuccess ? "Memproses..." : "Bayar Sekarang"}
            </Button>
            {!isFormComplete && (
              <div className="text-muted small">
                Lengkapi alamat dan kontak untuk mengaktifkan pembayaran.
              </div>
            )}
            <div className="text-muted small">
              Pembayaran aman dan terenkripsi. Dengan menekan tombol di atas, kamu menyetujui
              syarat &amp; ketentuan DinoMarket.
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default Checkout;
