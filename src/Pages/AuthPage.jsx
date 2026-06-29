import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthButton from "../Components/AuthButton";

const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = mode === "signup";

  return (
    <main className="page-surface auth-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="soft-card text-center">
              <Card.Body className="p-4 p-md-5">
                {location.state?.message && (
                  <Alert variant="warning" className="text-start">
                    {location.state.message}
                  </Alert>
                )}
                <h1 className="h3 fw-bold mb-2">
                  {isRegister ? "Daftar Akun DinoMarket" : "Masuk ke DinoMarket"}
                </h1>
                <p className="text-muted mb-4">
                  {isRegister
                    ? "Buat akun untuk menyimpan keranjang dan memantau pesanan."
                    : "Masuk terlebih dahulu untuk checkout dan mengelola pesanan."}
                </p>
                <AuthButton
                  initialMode={mode}
                  forceOpen
                  onAuthenticated={() => navigate(location.state?.from || "/orders", { replace: true })}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

AuthPage.propTypes = {
  mode: PropTypes.oneOf(["signin", "signup"]).isRequired,
};

export default AuthPage;
