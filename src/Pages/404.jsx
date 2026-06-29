import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="page-surface not-found-page">
      <Container className="py-5 text-center">
        <div className="not-found-visual" aria-hidden="true">
          <FiSearch />
        </div>
        <h1>404</h1>
        <h2>Halaman yang kamu cari tidak ditemukan.</h2>
        <p>
          Link mungkin sudah berubah atau halaman tidak tersedia. Kamu bisa kembali ke beranda
          atau melihat katalog produk DinoMarket.
        </p>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Button as={Link} to="/" size="lg">
            Kembali ke Beranda
          </Button>
          <Button as={Link} to="/search/all" variant="outline-primary" size="lg">
            Lihat Produk
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;
