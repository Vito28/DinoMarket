import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import QuantityButton from "../Components/QuantityButton";
import {
  getCartItems,
  removeCartItem,
  setCartItemNote,
  updateCartItemQuantity,
} from "../storage/cartStorage";
import { formatCurrency } from "../utils/format";
import useCatalogData from "../hooks/useCatalogData";

const PROMO_OPTIONS = [
  { code: "", label: "Pilih promo tersedia" },
  { code: "FREESHIP", label: "Gratis Ongkir", description: "Bebas biaya kirim hingga $6.50" },
  { code: "SALE10", label: "Diskon 10%", description: "Potongan 10% untuk produk pilihan" },
  { code: "BUNDLE20", label: "Bundling Hemat $20", description: "Min. belanja $200" },
];

const ProductsInCart = ({ onCartChange }) => {
  const { products, shops, isLoading, isError, refetch } = useCatalogData();
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getCartItems());
  const [selected, setSelected] = useState(() => new Set(items.map((item) => item.productId)));
  const [noteState, setNoteState] = useState({ show: false, productId: null, text: "" });
  const [selectedPromo, setSelectedPromo] = useState("");

  const refresh = useCallback(
    (shouldPropagate = true) => {
      const latest = getCartItems();
      setItems(latest);
      setSelected((prev) => {
        const validIds = new Set(latest.map((item) => item.productId));
        const next = new Set([...prev].filter((id) => validIds.has(id)));
        const prevSelectedAll = prev.size === items.length && items.length > 0;
        const shouldAutoSelect =
          prevSelectedAll || (prev.size === 0 && items.length === 0);

        if (shouldAutoSelect) {
          latest.forEach((item) => {
            if (!next.has(item.productId)) {
              next.add(item.productId);
            }
          });
        }

        return next;
      });

      if (shouldPropagate && onCartChange) {
        onCartChange(latest);
      }
    },
    [onCartChange, items.length]
  );

  const detailedItems = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          return null;
        }
        const shop =
          shops.find((shopItem) => shopItem.id === (item.shopId ?? product.shop?.id)) ??
          product.shop;
        const discounted =
          product.price - product.price * (product.discount_percentage / 100);

        return {
          ...item,
          product,
          shop,
          discountedPrice: discounted,
        };
      })
      .filter(Boolean);
  }, [items, products, shops]);

  const groupedByShop = useMemo(() => {
    const map = new Map();
    detailedItems.forEach((item) => {
      const key = item.shop?.id ?? item.shopId ?? "unknown";
      if (!map.has(key)) {
        map.set(key, {
          shopId: key,
          shopName: item.shop?.name ?? "Unknown Vendor",
          items: [],
        });
      }
      map.get(key).items.push(item);
    });
    return Array.from(map.values());
  }, [detailedItems]);

  const allSelected =
    selected.size === detailedItems.length && detailedItems.length > 0;

  const baseSummary = useMemo(() => {
    const summary = detailedItems.reduce(
      (acc, item) => {
        if (!selected.has(item.productId)) {
          return acc;
        }
        acc.items += 1;
        acc.quantity += item.quantity;
        acc.originalTotal += item.product.price * item.quantity;
        acc.discountedTotal += item.discountedPrice * item.quantity;
        return acc;
      },
      { items: 0, quantity: 0, originalTotal: 0, discountedTotal: 0 }
    );
    summary.savings = summary.originalTotal - summary.discountedTotal;
    return summary;
  }, [detailedItems, selected]);

  const checkoutSummary = useMemo(() => {
    const shippingBase =
      baseSummary.items === 0 || baseSummary.discountedTotal >= 150 ? 0 : 6.5;
    let shippingFee = shippingBase;
    let promoDiscount = 0;
    let promoMessage = "";

    switch (selectedPromo) {
      case "FREESHIP":
        if (shippingFee > 0) {
          promoDiscount = shippingFee;
          shippingFee = 0;
          promoMessage = "Gratis ongkir diterapkan.";
        } else {
          promoMessage = "Belanja di atas $150 sudah gratis ongkir.";
        }
        break;
      case "SALE10":
        if (baseSummary.items > 0) {
          promoDiscount = baseSummary.discountedTotal * 0.1;
          promoMessage = "Diskon 10% berhasil diterapkan.";
        }
        break;
      case "BUNDLE20":
        if (baseSummary.discountedTotal >= 200) {
          promoDiscount = 20;
          promoMessage = "Potongan bundling $20 diterapkan.";
        } else if (baseSummary.items > 0) {
          promoMessage = "Minimal belanja $200 untuk promo bundling.";
        }
        break;
      default:
        break;
    }

    const finalTotal = Math.max(
      baseSummary.discountedTotal + shippingFee - promoDiscount,
      0
    );

    return {
      ...baseSummary,
      shipping: shippingFee,
      promoDiscount,
      finalTotal,
      promoMessage,
    };
  }, [baseSummary, selectedPromo]);

  useEffect(() => {
    if (checkoutSummary.items === 0 && selectedPromo) {
      setSelectedPromo("");
    }
  }, [checkoutSummary.items, selectedPromo]);

  const buildCheckoutPayload = useCallback(() => {
    return groupedByShop
      .map((group) => {
        const selectedItems = group.items.filter((item) =>
          selected.has(item.productId)
        );

        if (selectedItems.length === 0) {
          return null;
        }

        const totals = selectedItems.reduce(
          (acc, item) => {
            const original = item.product.price * item.quantity;
            const discounted = item.discountedPrice * item.quantity;
            acc.quantity += item.quantity;
            acc.subtotal += original;
            acc.discountedTotal += discounted;
            acc.savings += original - discounted;
            return acc;
          },
          { quantity: 0, subtotal: 0, discountedTotal: 0, savings: 0 }
        );

        return {
          shop: {
            id: group.shopId,
            name: group.shopName,
          },
          items: selectedItems.map((item) => ({
            productId: item.productId,
            title: item.product.title,
            quantity: item.quantity,
            price: item.product.price,
            discountedPrice: item.discountedPrice,
            image: item.product.images?.[0],
            discount: item.product.discount_percentage,
          })),
          totals,
        };
      })
      .filter(Boolean);
  }, [groupedByShop, selected]);

  const handleCheckout = useCallback(() => {
    const groups = buildCheckoutPayload();
    if (!groups.length) {
      return;
    }

    const checkoutPayload = {
      groups,
      summary: checkoutSummary,
      promoCode: selectedPromo || null,
      promoMessage: checkoutSummary.promoMessage,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("checkout_payload", JSON.stringify(checkoutPayload));
    navigate("/checkout", { state: checkoutPayload });
  }, [buildCheckoutPayload, checkoutSummary, navigate, selectedPromo]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(detailedItems.map((item) => item.productId)));
    }
  };

  const toggleSelectShop = (shopGroup) => {
    const isShopSelected = shopGroup.items.every((item) => selected.has(item.productId));
    if (isShopSelected) {
      const next = new Set(selected);
      shopGroup.items.forEach((item) => next.delete(item.productId));
      setSelected(next);
    } else {
      const next = new Set(selected);
      shopGroup.items.forEach((item) => next.add(item.productId));
      setSelected(next);
    }
  };

  const toggleSelectItem = (productId) => {
    const next = new Set(selected);
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    setSelected(next);
  };

  const handleQuantityChange = (productId) => (newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
    refresh();
  };

  const handleRemove = (productId) => {
    removeCartItem(productId);
    refresh();
  };

  const openNoteEditor = (productId, existingNote) => {
    setNoteState({
      show: true,
      productId,
      text: existingNote ?? "",
    });
  };

  const closeNoteEditor = () => {
    setNoteState({ show: false, productId: null, text: "" });
  };

  const saveNote = () => {
    if (!noteState.productId) {
      return;
    }
    setCartItemNote(noteState.productId, noteState.text);
    closeNoteEditor();
    refresh();
  };

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
        <h2 className="h4 fw-bold mb-0">Tidak dapat memuat detail produk</h2>
        <p className="text-muted">Periksa koneksi dan coba lagi.</p>
        <Button onClick={refetch}>Muat ulang</Button>
      </Container>
    );
  }

  if (detailedItems.length === 0) {
    return null;
  }

  return (
    <Container as="main" className="py-5">
      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <Form.Check
                type="checkbox"
                id="select-all"
                label={`Pilih Semua (${checkoutSummary.quantity} item)`}
                checked={allSelected}
                onChange={toggleSelectAll}
              />
              {selected.size > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    selected.forEach((productId) => removeCartItem(productId));
                    refresh();
                  }}
                >
                  Hapus Terpilih
                </Button>
              )}
            </Card.Body>
          </Card>

          {groupedByShop.map((shopGroup) => (
            <Card key={shopGroup.shopId} className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-white d-flex align-items-center justify-content-between">
                <Form.Check
                  type="checkbox"
                  id={`shop-${shopGroup.shopId}`}
                  label={shopGroup.shopName}
                  checked={shopGroup.items.every((item) => selected.has(item.productId))}
                  onChange={() => toggleSelectShop(shopGroup)}
                />
                <span className="text-muted small">
                  {shopGroup.items.length} produk
                </span>
              </Card.Header>
              <ListGroup variant="flush">
                {shopGroup.items.map((item) => (
                  <ListGroup.Item key={item.productId} className="py-4">
                    <Row className="align-items-center g-3">
                      <Col xs="auto">
                        <Form.Check
                          type="checkbox"
                          checked={selected.has(item.productId)}
                          onChange={() => toggleSelectItem(item.productId)}
                          aria-label={`Pilih ${item.product.title}`}
                        />
                      </Col>
                      <Col sm={2} xs={3}>
                      <Image
                        src={item.product.images?.[0]}
                        alt={item.product.title}
                        className="img-fluid rounded"
                        loading="lazy"
                        decoding="async"
                      />
                      </Col>
                      <Col>
                        <h6 className="mb-1">{item.product.title}</h6>
                        <div className="d-flex flex-wrap align-items-center gap-3">
                          <span className="fw-semibold text-primary">
                            {formatCurrency(item.discountedPrice)}
                          </span>
                          <span className="text-muted text-decoration-line-through">
                            {formatCurrency(item.product.price)}
                          </span>
                          <span className="badge bg-warning text-dark">
                            {item.product.discount_percentage}% OFF
                          </span>
                        </div>
                      </Col>
                      <Col sm="auto" className="text-sm-end">
                        <div className="d-flex flex-column align-items-sm-end gap-2">
                          <QuantityButton
                            productId={item.productId}
                            value={item.quantity}
                            persist={false}
                            onQuantityChange={handleQuantityChange(item.productId)}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              variant="link"
                              size="sm"
                              className="text-decoration-none p-0"
                              onClick={() => openNoteEditor(item.productId, item.note)}
                            >
                              {item.note ? "Edit Catatan" : "Tambah Catatan"}
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-danger text-decoration-none p-0"
                              onClick={() => handleRemove(item.productId)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: "6rem" }}>
            <Card.Body>
              <h5 className="mb-3">Ringkasan Belanja</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Produk dipilih</span>
                <span>
                  {checkoutSummary.items} produk ({checkoutSummary.quantity} pcs)
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Harga</span>
                <span>{formatCurrency(checkoutSummary.originalTotal)}</span>
              </div>
              <div className="d-flex justify-content-between text-success mb-2">
                <span>Hemat</span>
                <span>-{formatCurrency(checkoutSummary.savings)}</span>
              </div>
              <Form.Group className="mb-3">
                <Form.Label className="small text-muted mb-1">Voucher &amp; Promo</Form.Label>
                <Form.Select
                  size="sm"
                  value={selectedPromo}
                  onChange={(event) => setSelectedPromo(event.target.value)}
                  disabled={checkoutSummary.items === 0}
                >
                  {PROMO_OPTIONS.map((option) => (
                    <option key={option.code || "default"} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
                {selectedPromo && checkoutSummary.promoMessage && (
                  <div className="small text-muted mt-2">{checkoutSummary.promoMessage}</div>
                )}
              </Form.Group>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(checkoutSummary.discountedTotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Ongkir</span>
                <span>
                  {checkoutSummary.shipping === 0
                    ? "Gratis"
                    : formatCurrency(checkoutSummary.shipping)}
                </span>
              </div>
              <div className="d-flex justify-content-between text-success mb-2">
                <span>Promo</span>
                <span>
                  {checkoutSummary.promoDiscount > 0
                    ? `-${formatCurrency(checkoutSummary.promoDiscount)}`
                    : "-"}
                </span>
              </div>
              <Card className="bg-light border-0 mb-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total Bayar</span>
                  <span className="fs-5 fw-bold text-primary">
                    {formatCurrency(checkoutSummary.finalTotal)}
                  </span>
                </Card.Body>
              </Card>
              <Button
                variant="primary"
                className="w-100"
                size="lg"
                disabled={checkoutSummary.items === 0}
                onClick={handleCheckout}
              >
                Lanjutkan Pembayaran
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={noteState.show} onHide={closeNoteEditor} centered>
        <Modal.Header closeButton>
          <Modal.Title>Catatan Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="note">
            <Form.Label>Keterangan untuk penjual</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={noteState.text}
              onChange={(event) =>
                setNoteState((prev) => ({ ...prev, text: event.target.value }))
              }
              maxLength={200}
            />
            <Form.Text muted>Max 200 karakter.</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={closeNoteEditor}>
            Batal
          </Button>
          <Button variant="primary" onClick={saveNote}>
            Simpan Catatan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

ProductsInCart.propTypes = {
  onCartChange: PropTypes.func,
};

export default ProductsInCart;
