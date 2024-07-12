import ProductCard from "../Components/ProductCard"
import { useSelector } from "react-redux"
const Home = () => {
  const { products } = useSelector(state => state.data);
  return (
    <div className="container-shopify">
      <ProductCard products={products} />
    </div>

  )
}

export default Home;

