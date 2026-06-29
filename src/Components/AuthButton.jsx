import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHelpCircle, FiLogOut, FiSettings, FiShoppingBag, FiUser } from "react-icons/fi";
import PropTypes from "prop-types";
import { setUser, clearUser } from "../store";
import {
  signInUser,
  signOutCurrentUser,
  signUpUser,
} from "../storage/authStorage";
import { syncCartForActiveUser } from "../storage/cartStorage";

const emptyFormState = {
  name: "",
  email: "",
  password: "",
};

const AuthButton = ({ initialMode = "signin", forceOpen = false, onAuthenticated }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(forceOpen);
  const [mode, setMode] = useState(initialMode);
  const [formState, setFormState] = useState(emptyFormState);
  const [error, setError] = useState("");

  const openModal = (nextMode) => {
    setMode(nextMode);
    setFormState(emptyFormState);
    setError("");
    setShowModal(true);
  };

  useEffect(() => {
    if (forceOpen && !currentUser) {
      setMode(initialMode);
      setShowModal(true);
    }
  }, [currentUser, forceOpen, initialMode]);

  const closeModal = () => {
    setShowModal(false);
    setFormState(emptyFormState);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const trimmedPayload = {
        name: formState.name.trim(),
        email: formState.email.trim(),
        password: formState.password,
      };

      const user =
        mode === "signup"
          ? signUpUser(trimmedPayload)
          : signInUser({
              email: trimmedPayload.email,
              password: trimmedPayload.password,
            });

      dispatch(setUser(user));
      syncCartForActiveUser();
      closeModal();
      onAuthenticated?.(user);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleSignOut = () => {
    signOutCurrentUser();
    dispatch(clearUser());
    syncCartForActiveUser();
  };

  const modalTitle = mode === "signup" ? "Daftar Akun" : "Masuk ke Akun";

  return (
    <>
      {currentUser ? (
        <Dropdown align="end" className="account-dropdown">
          <Dropdown.Toggle variant="light" className="account-toggle">
            <span className="account-avatar" aria-hidden="true">
              {(currentUser.name || currentUser.email || "A").charAt(0).toUpperCase()}
            </span>
            <span className="d-none d-xl-inline">
              {currentUser.name || "Akun Saya"}
            </span>
            <span className="d-inline d-xl-none">Akun</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="account-menu border-0 shadow">
            <Dropdown.Header>
              <div className="fw-semibold text-dark">{currentUser.name || "Akun Saya"}</div>
              <div className="small text-muted">{currentUser.email}</div>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/settings">
              <FiUser className="me-2" />
              Profil Saya
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/orders">
              <FiShoppingBag className="me-2" />
              Pesanan Saya
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/settings">
              <FiSettings className="me-2" />
              Settings
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/help">
              <FiHelpCircle className="me-2" />
              Pusat Bantuan
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut} className="text-danger">
              <FiLogOut className="me-2" />
              Keluar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <ButtonGroup className="auth-actions">
          <Button variant="outline-primary" onClick={() => openModal("signin")}>
            Masuk
          </Button>
          <Button variant="primary" onClick={() => openModal("signup")}>
            Daftar
          </Button>
        </ButtonGroup>
      )}

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="d-flex flex-column gap-3">
            {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
            {mode === "signup" && (
              <Form.Group controlId="auth-name">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Contoh: Andi Pratama"
                  required
                />
              </Form.Group>
            )}
            <Form.Group controlId="auth-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                required
              />
            </Form.Group>
            <Form.Group controlId="auth-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                minLength={6}
                required
              />
            </Form.Group>
            <div className="small text-muted">
              {mode === "signup" ? (
                <>
                  Dengan mendaftar, kamu setuju dengan{" "}
                  <Link to="/terms">syarat &amp; ketentuan</Link>.
                </>
              ) : (
                <>
                  Belum punya akun?{" "}
                  <Button
                    variant="link"
                    className="p-0 align-baseline"
                    onClick={() => openModal("signup")}
                  >
                    Daftar sekarang
                  </Button>
                  .
                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={closeModal}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              {mode === "signup" ? "Buat Akun" : "Masuk"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AuthButton;

AuthButton.propTypes = {
  initialMode: PropTypes.oneOf(["signin", "signup"]),
  forceOpen: PropTypes.bool,
  onAuthenticated: PropTypes.func,
};
