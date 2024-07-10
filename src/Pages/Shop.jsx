import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import ProductCard from "../Components/ProductCard";
import "../assets/Style/Pages/Shop.scss";
import QuantityButton from "../Components/QuantityButton";
import { useState } from "react";
import PopupCart from "../Components/Popup/PopupCart";
import { Helmet } from "react-helmet-async";

const Shop = () => {
  const { id } = useParams();
  const { products, shops } = useSelector(state => state.data);
  const [quantity, setQuantity] = useState(() => {
    return JSON.parse(localStorage.getItem(`quantities_${id}`)) || 1;
  });
  const [showPopup, setShowPopup] = useState(false);
  const uniqueItem = products.find(product => product.id === parseInt(id));
  const uniqueShop = shops.find(shop => shop.id === uniqueItem.shop.id);
  const uniqueShopProducts = products.filter(product => product.shop.id == uniqueItem.shop.id && product.id !== parseInt(id));

  const addToCart = () => {
    setShowPopup(true);
    const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
    const existingIndex = storedProducts.findIndex(product => product.id === uniqueItem.id);

    if (existingIndex === -1) {
      storedProducts.push({ id: uniqueItem.id, shopId: uniqueItem.shop.id, quantities: quantity });
    } else {
      storedProducts[existingIndex].quantities = quantity;
    }

    localStorage.setItem("stored_products", JSON.stringify(storedProducts));
    localStorage.setItem(`quantities_${id}`, JSON.stringify(quantity));
  };

  const handleQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const addNote = () => {
    console.log("Add Note");
  };

  const port = window.location.port;

  return (
    <>
      <Helmet>
        <title>{uniqueItem.title} - {uniqueShop.name}</title>
        <meta name="description" content={`Buy ${uniqueItem.title} from ${uniqueShop.name}. Discount ${uniqueItem.discount_percentage}%! ${uniqueItem.description}`} />
        <meta name="keywords" content={`${uniqueItem.title}, ${uniqueShop.name}, buy ${uniqueItem.title}, discount ${uniqueItem.title}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://${window.location.hostname}:${port}/shop/${id}`} />
      </Helmet>

      <Container >
        <Row>
          <Col lg={4} sm={12}>
            <h1 className="title-product">{uniqueItem.title}</h1>
            <p className="description">{uniqueItem.description}</p>
            <Image src={uniqueItem.images[1]} alt={`${uniqueItem.title} image`} />
            <div className="wrapper-item">
              <div className="title">
                <h2>{uniqueItem.title}</h2>
              </div>
              <div className="price">
                <h6 className="real-price">$ {uniqueItem.price}</h6>
                <h1 className="discount-price">${(uniqueItem.price - (uniqueItem.price * (uniqueItem.discount_percentage / 100))).toFixed(2)}</h1>
              </div>
              <div className="price">
                <h5>Deskripsi</h5>
                <p>{uniqueItem.description}</p>
              </div>
            </div>
            <div className="container-cart">
              <h1>Tokovito</h1>
              <div className="card-cart">
                <h2>Sesuaikan Jumlah dan Catatan</h2>
                <Image src={uniqueItem.images[2]} alt={`${uniqueItem.title} image`} />
                <QuantityButton id={uniqueItem.id} onQuantityChange={handleQuantity} type={"cart"} />
              </div>
            </div>
            <div className="add-note">
              <BiPencil aria-label="Tambah Catatan" onClick={addNote} />
              <span>Tambah Catatan</span>
            </div>
            <div className="subtotal">
              <p>Subtotal</p>
              <h4>${uniqueItem.price * quantity}</h4>
            </div>
            <div className="bought-btn">
              <button type="button" aria-label={`Beli ${uniqueItem.title}`}>Beli</button>
              <button type="button" onClick={addToCart} aria-label={`Tambah ${uniqueItem.title} ke Keranjang`}>+ Keranjang</button>
            </div>
          </Col>
        </Row>
      </Container>
      {showPopup ? <PopupCart /> : null}
      <Container className="white">
        <Row>
          <Col xs="auto">
            <Image src={uniqueItem.images[0]} alt={`${uniqueShop.name} logo`} />
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
                <label>Persentase Chat</label>
                <span>76%</span>
              </div>
              <div className="x-shopify">
                <label>Waktu Balas Chat</label>
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
