import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import useCatalogData from "../hooks/useCatalogData";

const normalizeText = (text = "") => text.toLowerCase().trim();

const SearchResults = () => {
  const { value } = useParams();
  const { products, isLoading, isError, refetch } = useCatalogData();

  const keyword = normalizeText(value);

  const filteredProducts = useMemo(() => {
    if (!keyword || keyword === "all") {
      return products;
    }

    return products.filter((product) => {
      const haystack = [
        product.title,
        product.description,
        product.shop?.name,
      ]
        .filter(Boolean)
        .map(normalizeText)
        .join(" ");

      return haystack.includes(keyword);
    });
  }, [keyword, products]);

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="py-5 text-center d-flex flex-column gap-3 align-items-center">
        <h2 className="h4 fw-bold mb-0">Pencarian sementara tidak tersedia</h2>
        <p className="text-muted">Klik tombol di bawah ini untuk mencoba lagi.</p>
        <Button onClick={refetch}>Muat ulang</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="h3 mb-1">Hasil Pencarian</h2>
          <p className="text-muted mb-0">
            {keyword && keyword !== "all"
              ? `Menampilkan produk yang relevan dengan "${value}".`
              : "Menampilkan semua produk di katalog kami."}
          </p>
        </div>
        <Button variant="outline-secondary" href="/DinoMarket/">
          Kembali ke Beranda
        </Button>
      </div>

      <ProductCard products={filteredProducts} />
    </Container>
  );
};

export default SearchResults;
