import ProductsInCart from "../Layout/ProductsInCart";
import ProductsNotInCart from "../Layout/ProductsNotInCart";

const Cart = () => {
  const getProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
  console.log(getProducts);
  return (
    <>
      {
        getProducts.length !== 0 ? <ProductsInCart /> : <ProductsNotInCart />
      }
    </>
  )
}

export default Cart;
