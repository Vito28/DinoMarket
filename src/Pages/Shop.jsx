import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import ProductCard from "../Components/ProductCard"
import "../assets/Style/Pages/Shop.scss"
import QuantityButton from "../Components/QuantityButton";
import { useState, useEffect } from "react";

const Shop = () => {
  const { id } = useParams();
  const { products, shops } = useSelector(state => state.data);
  const [quantity, setQuantity] = useState(() => {
    return JSON.parse(localStorage.getItem(`quantities_${id}`)) || 1;
  });
  const uniqueItem = products.find(product => product.id === parseInt(id));

  const uniqueShop = shops.find(shop => shop.id === uniqueItem.shop.id);

  const uniqueShopProducts = products.filter(product => product.shop.id == uniqueItem.shop.id && product.id !== parseInt(id));

  const addToCart = () => {
    const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
    const existingIndex = storedProducts.findIndex(product => product.id === uniqueItem.id)

    existingIndex === -1
      ? storedProducts.push({ id: uniqueItem.id, shopId: uniqueItem.shop.id })
      : (storedProducts[existingIndex].quantities = quantity);

    localStorage.setItem("stored_products", JSON.stringify(storedProducts));
    localStorage.setItem(`quantities_${id}`, JSON.stringify(quantity));
  }

  const handleQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };
A
  // useEffect(() => {
  //   localStorage.setItem(`quantities_${id}`, JSON.stringify(quantity));
  // }, [quantity, id]);

  return (
    <>
      <Container className="white">
        <Row>
          <Col lg={4} sm={12} >
            <Image src={uniqueItem.images[1]} alt={uniqueShop.name} />
            <div className="wrapper-item">
              <div className="title">
                <h1>{uniqueItem.title}</h1>
              </div>
              <div className="price">
                <h6 className="real-price">$ {uniqueItem.price}</h6>
                <h1 className="discount-price">${(uniqueItem.price - (uniqueItem.price * (uniqueItem.discount_percentage / 100))).toFixed(2)}</h1>
              </div>
              <div className="price">
                <h5>Description</h5>
                <p>{uniqueItem.description}</p>
              </div>

            </div>
            <div className="container-cart">
              <h1>Tokovito</h1>
              <div className="card-cart">
                <h2>Adjust Quantity and Notes</h2>
                <Image src={uniqueItem.images[1]} alt={uniqueItem.title} />
                <QuantityButton id={uniqueItem.id} onQuantityChange={handleQuantity} type={"cart"} />
              </div>
            </div>
            <div className="add-note">
              <BiPencil aria-label="Add Note" />
              <span>Add Note</span>
            </div>
            <div className="subtotal">
              <p>Subtotal</p>
              <h4>${uniqueItem.price * quantity}</h4>
            </div>
            <div className="bought-btn">
              <button type="button" aria-label={`Buy ${uniqueItem.title}`}>Buy</button>
              <button type="button" onClick={addToCart} aria-label={`Add ${uniqueItem.title} to Cart`}> + Cart</button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="white">
        <Row>
          <Col xs="auto">
            <Image src={uniqueItem.images[0]} alt={uniqueShop.name} />
            <div className="container-shop-identity">
              <h2>{uniqueShop.name}</h2>
              <div className="">
                <button>Chat Sekarang</button>
                <button>Kunjungi Toko</button>
              </div>
            </div>
            <div className="rate">
              <div className="x-shopify">
                <label>Rating</label>
                <span>15,5rb</span>
              </div>
              <div className="x-shopify">
                <label>Percentage Chat</label>
                <span>76%</span>
              </div>
              <div className="x-shopify">
                <label>Waktu chat dibalas</label>
                <span>2 jam</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <h2>Produk Lainnya</h2>
          </Col>
        </Row>
        <ProductCard products={uniqueShopProducts} />
      </Container>
    </>
  );
}

export default Shop;
