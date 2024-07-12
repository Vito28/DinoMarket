import ProductCard from "../Components/ProductCard"
import { useSelector } from "react-redux"
const Home = () => {
  const { products } = useSelector(state => state.data);
  return (
      <ProductCard products={products} />

  )
}

export default Home;

