import { Container } from "react-bootstrap";
import ProductCard from "../Components/ProductCard"
import { useSelector } from "react-redux"
const Home = () => {
  const { products } = useSelector(state => state.data);
  return (
    <Container className="page">
      <ProductCard products={products} />
    </Container>

  )
}

export default Home;

