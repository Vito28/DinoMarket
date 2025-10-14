import { useCallback, useEffect, useState } from "react";
import ProductsInCart from "../Layout/ProductsInCart";
import ProductsNotInCart from "../Layout/ProductsNotInCart";
import { CART_UPDATED_EVENT, getCartItems } from "../storage/cartStorage";

const Cart = () => {
  const [items, setItems] = useState(() => getCartItems());

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => setItems(getCartItems());
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const handleCartChange = useCallback((nextItems) => {
    setItems(nextItems);
  }, []);

  if (items.length === 0) {
    return <ProductsNotInCart />;
  }

  return <ProductsInCart onCartChange={handleCartChange} />;
};

export default Cart;
