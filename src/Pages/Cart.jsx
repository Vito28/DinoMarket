import { useEffect, useState } from "react";
import ProductsInCart from "../Layout/ProductsInCart";
import ProductsNotInCart from "../Layout/ProductsNotInCart";

const Cart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
    setProducts(getProducts);
  }, [products])

  return (
    <>
      {
        products.length !== 0 ? <ProductsInCart /> : <ProductsNotInCart />
      }
    </>
  )
}

export default Cart;
