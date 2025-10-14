import { useState } from "react";
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

const AuthButton = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("signin");
  const [formState, setFormState] = useState(emptyFormState);
  const [error, setError] = useState("");

  const openModal = (nextMode) => {
    setMode(nextMode);
    setFormState(emptyFormState);
    setError("");
    setShowModal(true);
  };

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
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-secondary" size="sm">
            {currentUser.name || currentUser.email}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/#orders">
              Pesanan Saya
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Keluar</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <ButtonGroup size="sm">
          <Button variant="secondary" onClick={() => openModal("signin")}>
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
                  <Link to="/#terms">syarat &amp; ketentuan</Link>.
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
