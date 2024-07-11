import { useSelector } from "react-redux";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import "../assets/Style/Pages/Cart.scss";
import QuantityButton from "../Components/QuantityButton";

const Cart = () => {
  const { products } = useSelector((state) => state.data);
  const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
  const [getProducts, setGetProducts] = useState(storedProducts);
  const [cart, setCart] = useState({});
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedShops, setCheckedShops] = useState({});
  const [checkedProducts, setCheckedProducts] = useState({});
  const [priceCart, setPriceCart] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    const carts = products.reduce((acc, p) => {
      getProducts.forEach((a) => {
        if (p.shop.id === a.shopId && p.id === a.id) {
          if (!acc[p.shop.id]) {
            acc[p.shop.id] = [];
          }
          acc[p.shop.id].push({
            id: p.id,
            price: p.price,
            title: p.title,
            image: p.images[1],
            discount_percentage: p.discount_percentage,
          });
        }
      });
      return acc;
    }, {});

    setCart(carts);
  }, [getProducts, products]);



  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (cartQuantity) => {
    setQuantity(cartQuantity)
  }
  useEffect(() => {
    handleCheckAll()
  }, [handleCheckAll])
  const handleCheckAll = () => {
    const newCheckedAll = !checkedAll;
    setCheckedAll(newCheckedAll);
    const newCheckedShops = {};
    const newCheckedProducts = {};

    Object.keys(cart).forEach((shopId) => {
      newCheckedShops[shopId] = newCheckedAll;
      cart[shopId].forEach((product) => {
        newCheckedProducts[product.id] = newCheckedAll;
      });
    });

    setCheckedShops(newCheckedShops);
    setCheckedProducts(newCheckedProducts);
    calculateTotalPrice(newCheckedProducts);
  };

  const handleCheckShop = (shopId) => {
    const newCheckedShops = { ...checkedShops, [shopId]: !checkedShops[shopId] };
    setCheckedShops(newCheckedShops);

    const newCheckedProducts = { ...checkedProducts };
    cart[shopId].forEach((product) => {
      newCheckedProducts[product.id] = newCheckedShops[shopId];
    });

    setCheckedProducts(newCheckedProducts);
    calculateTotalPrice(newCheckedProducts);
  };

  const handleCheckProduct = (productId) => {
    const newCheckedProducts = { ...checkedProducts, [productId]: !checkedProducts[productId] };
    setCheckedProducts(newCheckedProducts);
    calculateTotalPrice(newCheckedProducts);
  };

  const calculateTotalPrice = (checkedProducts) => {
    let totalPrice = 0;
    Object.keys(cart).forEach((shopId) => {
      cart[shopId].forEach((product) => {
        if (checkedProducts[product.id]) {
          const quantity = JSON.parse(localStorage.getItem(`quantities_${product.id}`)) || 1;
          totalPrice += product.price * quantity;
        }
      });
    });
    setPriceCart(totalPrice);
  };

  const deleteSelectedProducts = () => {
    const newGetProducts = getProducts.filter(
      (p) => !checkedProducts[p.id]
    );
    setGetProducts(newGetProducts);
    localStorage.setItem("stored_products", JSON.stringify(newGetProducts));
  };


  console.log(checkedProducts);
  console.log(checkedShops);

  return (
    <Container>
      <Row>
        <Col sm="8">
          <input
            type="checkbox"
            checked={checkedAll}
            onChange={handleCheckAll}
          />
          <h1 onClick={deleteSelectedProducts}>
            {checkedAll || Object.values(checkedShops).some(checked => checked) || Object.values(checkedProducts).some(checked => checked) ? "HAPUS" : null}
          </h1>
          {Object.keys(cart).map((shopId) => (
            <div key={shopId} className="shop-cart-container">
              <div className="shop-cart">
                <input
                  type="checkbox"
                  checked={checkedShops[shopId] || true}
                  onChange={() => handleCheckShop(shopId)}
                />
                <h2>Shop ID: {shopId}</h2>
              </div>

              {cart[shopId].map((product) => (
                <div key={product.id} className="product-cart-container">
                  <input
                    type="checkbox"
                    checked={checkedProducts[product.id] || true}
                    onChange={() => handleCheckProduct(product.id)}
                  />
                  <div className="container-cart-2">
                    <Image src={product.image} />
                    <p>Title: {product.title}</p>
                  </div>
                  <div className="container-cart-3">
                    <p className="discount">
                      Discount Percentage: $
                      {(product.price - product.price * (product.discount_percentage / 100)).toFixed(2)}
                    </p>
                    <p className="price">Price: ${product.price}</p>
                    <div className="container-cart-3-bottom">
                      <div className="add-item">
                        {
                          JSON.parse(localStorage.getItem(`addNote_${product.id}`)) ?
                            <div className="input-note">
                              <div>{JSON.parse(localStorage.getItem(`addNote_${product.id}`))}
                              </div>
                              <div className="note-design">
                                <FiFileText className="doc" />
                                <BiPencil className="pencil" />
                              </div>
                            </div> :
                            <div className="note-design">
                                <FiFileText className="doc" />
                                <BiPencil className="pencil" />
                              </div>
                        }


                        <GoTrash onClick={() => deleteSelectedProducts()} />
                        <QuantityButton id={product.id} onQuantityChange={handleQuantity} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Col>
        <Col sm="4">
          <div>{priceCart}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
