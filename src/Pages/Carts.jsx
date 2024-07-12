import { useSelector } from "react-redux";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import "../assets/Style/Pages/Cart.scss"
import QuantityButton from "../Components/QuantityButton";

const Cart = () => {
  const { products } = useSelector((state) => state.data);
  const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
  const [getProducts, setGetProducts] = useState(storedProducts)
  const [cart, setCart] = useState({});
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedShop, setCheckedShop] = useState(true);
  const [checkedProduct, setCheckedProduct] = useState(true);
  const [priceCart, setPriceCart] = useState("")
  const checkedRef = useRef(null)

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

    setCart(carts)
  }, [getProducts, products])
  

  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (cartQuantity) => {
    setQuantity(cartQuantity)
  }

  // const onCheckedAll = () => {
  //   if()
  // }

  const onChecked = (id) => (e) => {
    const checked = e.target.checked;
    if (checked) {
      localStorage.setItem(`cart_${id}`, JSON.stringify(quantity));
    }
  };

  const getAllProduct = () => {
    setCheckedAll(prev => !prev);
    if(checkedAll) {
      setCheckedShop(true);
      setCheckedProduct(true);
    } else {
      setCheckedShop(false);
      setCheckedProduct(false);
    }
    const filterAll = products.filter(product => storedProducts.some(item => item.id === product.id));
    let counterPrice = 0;
    if(checkedAll) {
      filterAll.forEach(price => {
        counterPrice += price.price * JSON.parse(localStorage.getItem(`quantities_${price.id}`));
      }) 
      setPriceCart(counterPrice);
    } else {
      setPriceCart(0)
    }
  }



  const getAllShopProduct = (ShopId) => {
    const filterShop = products.filter(product => storedProducts.some(item => product.id === item.id && product.shopId === ShopId));
    !checkedAll ? setCheckedShop(false) : setCheckedShop(true);
    !checkedShop ? setCheckedProduct(false) : setCheckedProduct(true);
    
    let counterPrice = 0;
    if(checkedShop) {
      filterShop.forEach(price => {
        counterPrice += price.price * JSON.parse(localStorage.getItem(`quantities_${price.id}`)) 
      })
      setPriceCart(counterPrice)
    } else {
      setPriceCart(0)
    }
    localStorage.setItem("priceCart", JSON.stringify(priceCart));
    
    console.log(filterShop)
  }

  const getProduct = (id) => {
    const filterId = products.filter(product => product.id === id);
    !checkedProduct ? setCheckedProduct(false) : setCheckedProduct(true);
    checkedProduct ? setPriceCart(JSON.parse(localStorage.getItem(`quantities_${id}`)) * filterId.price) : null;
    localStorage.setItem("priceCart", JSON.stringify(priceCart));
    
    console.log(filterId);
  }

  const deleteAll = () => {
    setGetProducts([]);
    localStorage.removeItem("stored_products");
  }

  const deleteShop = () => {
    const filterShop = products.filter(product => storedProducts.some(item => item.id === product.id && item.shopId === product.shop.id));
    console.log(filterShop);
  }

  const deleteProduct = (id) => {
    
  }
  
  const onDelete = () => {
    if(checkedAll) {
      deleteAll();
    } else if(checkedShop) {
      deleteShop();
    } else {
      deleteProduct();
    }
  }

  return (
    <div className="container-shopify">
      <Row>
        <Col sm="8">
        {}
        <input type="checkbox" checked={checkedAll} onClick={getAllProduct}></input>
        <h1 onClick={onDelete}>{checkedAll || checkedShop || checkedProduct ? "HAPUS" : null}</h1>
          {Object.keys(cart).map((shopId) => (
            
            <div key={shopId} className="shop-cart-container">
              <h1 onClick={deleteShop}>HAPUS</h1>
              <div className="shop-cart">
                <input type="checkbox" checked={checkedShop} onClick={() => getAllShopProduct(shopId)} />
                <h2>Shop ID: {shopId}</h2>
              </div>

              {cart[shopId].map((product) => (
                <div key={product.id} className="product-cart-container" onMouseEnter={() => onChecked(product.id)}>
                  <input type="checkbox" checked={checkedProduct} onClick={() => getProduct(product.id)} ref={checkedRef}/>

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
                        <div className="note-design">
                          <FiFileText className="doc" />
                          <BiPencil className="pencil" />
                        </div>

                        <GoTrash onClick={() => deleteProduct(product.id)} />
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
