import { useSelector } from "react-redux";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import "../assets/Style/Pages/Cart.scss";
import QuantityButton from "../Components/QuantityButton";

const ProductsInCart = () => {
  const [priceCart, setPriceCart] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const [checkedAll, setCheckedAll] = useState(true);
  const [popupNote, setPopupNote] = useState(false);

  const [cart, setCart] = useState({});
  const [checkedShops, setCheckedShops] = useState({});
  const [checkedProducts, setCheckedProducts] = useState({});

  const { products, shops } = useSelector((state) => state.data);
  const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
  const [getProducts, setGetProducts] = useState(storedProducts);

  const textRef = useRef(null);

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

    const newCheckedShops = {};
    const newCheckedProducts = {};
    Object.keys(carts).forEach((shopId) => {
      newCheckedShops[shopId] = true;
      carts[shopId].forEach((product) => {
        newCheckedProducts[product.id] = true;
      });
    });
    setCheckedShops(newCheckedShops);
    setCheckedProducts(newCheckedProducts);

    calculateTotalPrice(newCheckedProducts);
    totalQuantity(newCheckedProducts);
  }, [getProducts, products]);

  useEffect(() => {
    const allShopsChecked = Object.values(checkedShops).every((checked) => checked);
    const allProductsChecked = Object.values(checkedProducts).every((checked) => checked);
    setCheckedAll(allShopsChecked && allProductsChecked);
  }, [checkedShops, checkedProducts]);

  const handleQuantity = (cartQuantity) => {
    calculateTotalPrice(checkedProducts, cartQuantity);
  };

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
    totalQuantity(newCheckedProducts);
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
    let totalQuantities = 0;
    Object.keys(cart).forEach((shopId) => {
      cart[shopId].forEach((product) => {
        if (checkedProducts[product.id]) {
          const getQuantity = JSON.parse(localStorage.getItem(`quantities_${product.id}`)) || [1];
          const quantity = getQuantity[0];
          totalQuantities += quantity;
          totalPrice += product.price * quantity;
        }
      });
    });
    const roundedPrice = parseFloat(totalPrice.toFixed(2));
    setPriceCart(roundedPrice);
    localStorage.setItem("price_cart", JSON.stringify(roundedPrice));
    setTotalQuantities(totalQuantities);
  };

  const deleteSelectedProducts = () => {
    const newGetProducts = getProducts.filter((p) => !checkedProducts[p.id]);
    setGetProducts(newGetProducts);
    localStorage.setItem("stored_products", JSON.stringify(newGetProducts));
  };

  const popupNotes = () => {
    setPopupNote(true);
  };

  const onCancelNote = () => {
    setPopupNote(false);
  };

  const onSubmitNote = (id) => {
    if (textRef.current) {
      localStorage.setItem(`addNote_${id}`, JSON.stringify(textRef.current.value));
    }
  };

  const deleteSingleProduct = (id) => {
    const filterId = storedProducts.filter((p_id) => p_id.id !== id);
    setGetProducts(filterId);
    localStorage.setItem("stored_products", JSON.stringify(filterId));
  };

  const totalQuantity = (checkedProducts) => {
    let total = 0;
    Object.keys(cart).forEach((shopId) => {
      cart[shopId].forEach((product) => {
        if (checkedProducts[product.id]) {
          const getQuantity = JSON.parse(localStorage.getItem(`quantities_${product.id}`)) || [1];
          const quantity = getQuantity[0];
          total += quantity;
        }
      });
    });
    setTotalQuantities(total);
  };

  return (
    <main className="container-shopify">
      <Row>
        <Col lg={8} sm={8}>
          <div className="selected-all-container">
            <div className="selected-all">
              <input
                type="checkbox"
                checked={checkedAll}
                onChange={handleCheckAll}
                aria-label="Select all products"
              />
              <div>Selected All ({totalQuantities})</div>
            </div>

            <h4 onClick={deleteSelectedProducts} aria-label="Delete selected products">
              {checkedAll || Object.values(checkedShops).some((checked) => checked) || Object.values(checkedProducts).some((checked) => checked)
                ? "DELETE"
                : null}
            </h4>
          </div>

          {Object.keys(cart).map((shopId) => (
            <section key={shopId} className="shop-cart-container">
              <div className="shop-cart">
                <input
                  type="checkbox"
                  checked={checkedShops[shopId]}
                  onChange={() => handleCheckShop(shopId)}
                  aria-label={`Select products from shop ${shopId}`}
                />
                <div>{shops.filter(shop => shop.id === shopId ? shop.name : "Shop Not Found")}</div> 
              </div>

              {cart[shopId].map((product) => (
                <article key={product.id} className="product-cart-container">
                  <div className="wrapper-image-cart">
                    <input
                      type="checkbox"
                      checked={checkedProducts[product.id]}
                      onChange={() => handleCheckProduct(product.id)}
                      aria-label={`Select product ${product.title}`}
                    />
                    <div className="container-cart-2">
                      <Image src={product.image} alt={product.title} />
                      <p>Title: {product.title}</p>
                    </div>
                  </div>

                  <div className="container-cart-3">
                    <p className="discount">
                      ${parseFloat((product.price - product.price * (product.discount_percentage / 100))).toFixed(2)}
                    </p>
                    <p className="price">${product.price}</p>
                    <div className="container-cart-3-bottom">
                      <div className="add-item">
                        {JSON.parse(localStorage.getItem(`addNote_${product.id}`)) ?
                          <div className="input-note" onClick={popupNotes}>
                            <div>{JSON.parse(localStorage.getItem(`addNote_${product.id}`))}</div>
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
                        {popupNote &&
                          <div style={{ position: "absolute", zIndex: "9999", top: "0" }} className="container-popup-note">
                            <h1>Notes Product</h1>
                            <textarea ref={textRef} maxLength={144} />
                            <div>
                              <button onClick={onCancelNote}>Cancel</button>
                              <button onClick={() => onSubmitNote(product.id)}>Save</button>
                            </div>
                          </div>
                        }
                        <GoTrash onClick={() => deleteSingleProduct(product.id)} aria-label={`Delete product ${product.title}`} />
                        <QuantityButton id={product.id} onQuantityChange={handleQuantity} />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </Col>
        <Col sm="4">
          <div className="card-beli">
            <h1>Shopping Summary</h1>
            <p>Total <span>${checkedAll ? parseFloat(priceCart.toFixed(2)) : "-"}</span></p>
            <button>Buy</button>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default ProductsInCart;
