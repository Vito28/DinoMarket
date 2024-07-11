import { useSelector } from "react-redux";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import "../assets/Style/Pages/Cart.scss";
import QuantityButton from "../Components/QuantityButton";

const ProductsInCart = () => {
  const { products } = useSelector((state) => state.data);
  const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
  const [getProducts, setGetProducts] = useState(storedProducts);
  const [cart, setCart] = useState({});
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedShops, setCheckedShops] = useState({});
  const [checkedProducts, setCheckedProducts] = useState({});
  const [priceCart, setPriceCart] = useState (0);
  const [note, setNote] = useState("");
  const [popupNote, setPopupNote] = useState(false);

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
  }, [getProducts, products]);


  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (cartQuantity) => {
    setQuantity(cartQuantity)
  }

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
    console.log(newCheckedProducts);
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
    console.log(checkedShops);
  };

  const handleCheckProduct = (productId) => {
    const newCheckedProducts = { ...checkedProducts, [productId]: !checkedProducts[productId] };
    setCheckedProducts(newCheckedProducts);
    calculateTotalPrice(newCheckedProducts);
  };

  const calculateTotalPrice = (checkedProducts) => {
    console.log("hELLO wORLD");
    let totalPrice = 0;
    Object.keys(cart).forEach((shopId) => {
      cart[shopId].forEach((product) => {
        if (checkedProducts[product.id]) {
          const getQuantity = JSON.parse(localStorage.getItem(`quantities_${product.id}`)) || 1;
          const quantity = getQuantity[0];
          console.log(quantity);
          totalPrice += (product.price * quantity);
          console.log(product.price)
          setPriceCart(totalPrice);
          
        }
      });
    });
    localStorage.setItem("price_cart", JSON.stringify(totalPrice));
    console.log(totalPrice)

  };

  const deleteSelectedProducts = () => {
    const newGetProducts = getProducts.filter(p => !checkedProducts[p.id]
    );
    setGetProducts(newGetProducts);
    localStorage.setItem("stored_products", JSON.stringify(newGetProducts));
  };

  const popupNotes = () => {
    setPopupNote(true);
  }

  const onCancelNote = () => {
    setPopupNote(false);
  }

  const onSubmitNote = (id) => {
    if(textRef.current) {
      localStorage.setItem(`addNote_${id}`, JSON.stringify(textRef.current.value)); 
    }
  }


  console.log(checkedProducts);
  console.log(checkedShops);

  return (
    <Container>
      <Row>
        <Col sm="8">
          <input
            type="checkbox"
            checked={checkedAll ? true : false}
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
                  checked={checkedShops[shopId]}
                  onChange={() => handleCheckShop(shopId)}
                />
                <h2>Shop ID: {shopId}</h2>
              </div>

              {cart[shopId].map((product) => (
                <div key={product.id} className="product-cart-container">
                  <input
                    type="checkbox"
                    checked={checkedProducts[product.id]}
                    onChange={() => handleCheckProduct(product.id)}
                  />
                  <div className="container-cart-2">
                    <Image src={product.image} style={{width: '80px', height:
                    "80px"}}/>
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
                            <div className="input-note" onClick={popupNotes}>
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

                        {
                          popupNote && 
                          <div className="container-popup-note">
                            <h1>Notes Product</h1>
                            <textarea ref={textRef} maxLength={144}/>
                            <div>
                              <button onClick={onCancelNote}>Batal</button>
                              <button onClick={() => onSubmitNote(product.id)}>Simpan</button>
                            </div>
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

export default ProductsInCart;