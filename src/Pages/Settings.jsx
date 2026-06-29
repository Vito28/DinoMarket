import { useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiBell, FiLock, FiMapPin, FiShield, FiUser } from "react-icons/fi";
import { getAccountProfile, saveAccountProfile, upsertAddress } from "../storage/accountStorage";

const sections = [
  { id: "account", label: "Informasi Akun", icon: FiUser },
  { id: "address", label: "Alamat Pengiriman", icon: FiMapPin },
  { id: "security", label: "Keamanan Akun", icon: FiLock },
  { id: "notification", label: "Preferensi Notifikasi", icon: FiBell },
  { id: "privacy", label: "Privasi", icon: FiShield },
];

const emptyAddress = {
  id: "",
  label: "Rumah",
  recipientName: "",
  phone: "",
  addressLine: "",
  city: "",
  postalCode: "",
  isPrimary: true,
};

const Settings = () => {
  const [activeSection, setActiveSection] = useState("account");
  const { currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(() => getAccountProfile(currentUser));
  const primaryAddress = useMemo(
    () => profile.addresses.find((address) => address.isPrimary) ?? profile.addresses[0],
    [profile.addresses]
  );
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const nextProfile = getAccountProfile(currentUser);
    setProfile(nextProfile);
    const nextPrimaryAddress =
      nextProfile.addresses.find((address) => address.isPrimary) ?? nextProfile.addresses[0];
    setAddressForm(nextPrimaryAddress ?? {
      ...emptyAddress,
      recipientName: nextProfile.name,
      phone: nextProfile.phone,
    });
  }, [currentUser]);

  const showSavedMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2200);
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    const nextProfile = saveAccountProfile(currentUser, {
      ...profile,
      notifications: {
        ...profile.notifications,
        [name]: checked,
      },
    });
    setProfile(nextProfile);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    const nextProfile = saveAccountProfile(currentUser, profile);
    setProfile(nextProfile);
    showSavedMessage("Informasi akun berhasil disimpan.");
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();
    const nextProfile = upsertAddress(currentUser, {
      ...addressForm,
      isPrimary: true,
    });
    setProfile(nextProfile);
    setAddressForm(nextProfile.addresses.find((address) => address.isPrimary) ?? emptyAddress);
    showSavedMessage("Alamat utama berhasil disimpan dan akan otomatis mengisi checkout.");
  };

  if (!currentUser) {
    return (
      <main className="page-surface">
        <Container className="py-5">
          <Card className="soft-card empty-state">
            <Card.Body>
              <FiUser />
              <h1 className="h3 fw-bold">Masuk untuk mengelola profil</h1>
              <p>Profil dan alamat pengiriman tersimpan per akun di browser kamu.</p>
              <Button as={Link} to="/login">Masuk</Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    );
  }

  return (
    <main className="page-surface">
      <Container className="py-5">
        <div className="page-heading">
          <div>
            <h1>Settings</h1>
            <p>Kelola akun, alamat, keamanan, notifikasi, dan privasi kamu.</p>
          </div>
        </div>
        {message && <Alert variant="success">{message}</Alert>}
        <Row className="g-4">
          <Col lg={3}>
            <Card className="soft-card settings-nav">
              <Card.Body>
                <Nav className="flex-lg-column gap-2">
                  {sections.map(({ id, label, icon: Icon }) => (
                    <Nav.Link
                      key={id}
                      active={activeSection === id}
                      onClick={() => setActiveSection(id)}
                    >
                      <Icon />
                      <span>{label}</span>
                    </Nav.Link>
                  ))}
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={9}>
            <Card className="soft-card">
              <Card.Body className="settings-panel">
                {activeSection === "account" && (
                  <Form onSubmit={handleSaveProfile}>
                    <h2>Informasi Akun</h2>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                          name="name"
                          value={profile.name}
                          onChange={handleProfileChange}
                          placeholder="Nama lengkap"
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={profile.email} readOnly />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Nomor telepon</Form.Label>
                        <Form.Control
                          name="phone"
                          value={profile.phone}
                          onChange={handleProfileChange}
                          placeholder="+62 812 3456 7890"
                        />
                      </Col>
                    </Row>
                    <Button className="mt-4" type="submit">Simpan Informasi</Button>
                  </Form>
                )}
                {activeSection === "address" && (
                  <Form onSubmit={handleSaveAddress}>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                      <h2 className="mb-0">Alamat Pengiriman</h2>
                      {primaryAddress && <Badge bg="primary">Alamat Utama</Badge>}
                    </div>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Label>Label alamat</Form.Label>
                        <Form.Control name="label" value={addressForm.label} onChange={handleAddressChange} />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Nama penerima</Form.Label>
                        <Form.Control
                          name="recipientName"
                          value={addressForm.recipientName}
                          onChange={handleAddressChange}
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Nomor telepon</Form.Label>
                        <Form.Control
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Kota / Kecamatan</Form.Label>
                        <Form.Control
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Alamat lengkap</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="addressLine"
                          value={addressForm.addressLine}
                          onChange={handleAddressChange}
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Kode pos</Form.Label>
                        <Form.Control
                          name="postalCode"
                          value={addressForm.postalCode}
                          onChange={handleAddressChange}
                          required
                        />
                      </Col>
                    </Row>
                    <Button className="mt-4" type="submit">
                      Simpan Alamat Utama
                    </Button>
                  </Form>
                )}
                {activeSection === "security" && (
                  <>
                    <h2>Keamanan Akun</h2>
                    <p className="text-muted">Jaga keamanan akun dengan password kuat dan keluar dari perangkat yang tidak dikenal.</p>
                    <div className="d-flex flex-wrap gap-2">
                      <Button>Ubah Password</Button>
                      <Button variant="outline-danger">Logout dari Perangkat</Button>
                    </div>
                  </>
                )}
                {activeSection === "notification" && (
                  <>
                    <h2>Preferensi Notifikasi</h2>
                    {[
                      ["promo", "Promo"],
                      ["orderStatus", "Status pesanan"],
                      ["email", "Email notifikasi"],
                      ["push", "Push notification"],
                    ].map(([name, label]) => (
                      <Form.Check
                        key={name}
                        type="switch"
                        id={`notif-${name}`}
                        name={name}
                        label={label}
                        checked={Boolean(profile.notifications[name])}
                        onChange={handleNotificationChange}
                        className="mb-3"
                      />
                    ))}
                  </>
                )}
                {activeSection === "privacy" && (
                  <>
                    <h2>Privasi</h2>
                    <p className="text-muted">Kontrol data akun dan pahami bagaimana DinoMarket menjaga informasi kamu.</p>
                    <Button as={Link} to="/privacy" variant="outline-primary">Baca Kebijakan Privasi</Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Settings;
