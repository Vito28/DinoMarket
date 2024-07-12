import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import ProductCard from "../Components/ProductCard";
import QuantityButton from "../Components/QuantityButton";
import PopupCart from "../Components/Popup/PopupCart";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../assets/Style/Pages/Shop.scss";

const Shop = () => {
  const { id } = useParams();
  const { products, shops } = useSelector(state => state.data);
  const [quantity, setQuantity] = useState(() => {
    return JSON.parse(localStorage.getItem(`quantities_${id}`)) || 1;
  });
  const [showPopupCart, setShowPopupCart] = useState(false);
  const [showPopupAddNote, setShowPopupAddNote] = useState(false);
  const uniqueItem = products.find(product => product.id === parseInt(id));
  const uniqueShop = uniqueItem ? shops.find(shop => shop.id === uniqueItem.shop.id) : null;
  const uniqueShopProducts = uniqueItem ? products.filter(product => product.shop.id === uniqueItem.shop.id && product.id !== parseInt(id)) : [];

  const noteRef = useRef(null);

  const addToCart = () => {
    setShowPopupCart(true);
    const storedProducts = JSON.parse(localStorage.getItem("stored_products")) || [];
    const existingIndex = storedProducts.findIndex(product => product.id === uniqueItem.id);

    if (existingIndex === -1) {
      storedProducts.push({ id: uniqueItem.id, shopId: uniqueItem.shop.id, quantities: quantity });
    } else {
      storedProducts[existingIndex].quantities = quantity;
    }

    if (noteRef.current && noteRef.current.value) {
      const values = noteRef.current.value;
      localStorage.setItem(`addNote_${id}`, JSON.stringify(values));
      console.log(values);
      console.log(JSON.parse(localStorage.getItem(`addNote_${id}`)));
    }

    localStorage.setItem("stored_products", JSON.stringify(storedProducts));
    localStorage.setItem(`quantities_${id}`, JSON.stringify([quantity, quantity]));
  };

  const handleQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const addNote = () => {
    setShowPopupAddNote(true);
  };

  const cancelNote = () => {
    setShowPopupAddNote(false);
  };

  const handleClosePopup = () => {
    setShowPopupCart(false);
  };

  return (
    <div className="container-shopify">
      <Helmet>
        <title>{uniqueItem ? `${uniqueItem.title} - ${uniqueShop.name}` : "Shop Not Found"}</title>
        {uniqueItem && (
          <>
            <meta name="description" content={`Buy ${uniqueItem.title} from ${uniqueShop.name}. Discount ${uniqueItem.discount_percentage}%! ${uniqueItem.description}`} />
            <meta name="keywords" content={`${uniqueItem.title}, ${uniqueShop.name}, buy ${uniqueItem.title}, discount ${uniqueItem.title}`} />
            <link rel="canonical" href={`https://${window.location.hostname}:${window.location.port}/shop/${id}`} />
          </>
        )}
      </Helmet>

      {uniqueItem && uniqueShop && (
        <div className="product">
          <Row >
            <Col lg={6} sm={12} className="info-product">
              <h1 className="title-product">{uniqueItem.title}</h1>
              <p className="description">{uniqueItem.description}</p>

              <div className="wrapper-item">
                <div className="price">
                  <h6 className="real-price">$ {uniqueItem.price}</h6>
                  <h1 className="discount-price">${(uniqueItem.price - (uniqueItem.price * (uniqueItem.discount_percentage / 100))).toFixed(2)}</h1>
                </div>
                <div className="price">
                  <h5>Deskripsi</h5>
                  <p>{uniqueItem.description}</p>
                </div>
              </div>

            </Col>
            <Col lg={6} sm={12}>
              <Image src={uniqueItem.images[1]} alt={`${uniqueItem.title} image`} className="img-product" />
            </Col>
          </Row>
          <Row>
            <Col lg={12} sm={12}>
              <div className="add-note">
                {showPopupAddNote && <input ref={noteRef} type="text" placeholder="Ex. Color White, Size M" />}
                {!showPopupAddNote ? <div className="add-note-pencil" onClick={addNote}><BiPencil aria-label="Tambah Catatan" /><span>Tambah Catatan</span></div> : <p onClick={cancelNote}>Cancel Note</p>}
              </div>
            </Col>
          </Row>
        </div>
      )}



      {showPopupCart && <PopupCart id={uniqueItem.id} shopId={uniqueItem.shop.id} image={uniqueItem.images[1]} alt={uniqueItem.title} onClose={handleClosePopup} />}

      {uniqueShop && (
        <div className="container-shopify" style={{marginTop: '4rem', marginBottom: '4rem'}}>
          <Row>
            <Col xs="auto" className="aaa">
              <Image src={uniqueItem.images[0]} alt={`${uniqueShop.name} logo`} />
              <div className="container-shop-identity">
                
                <div className="rate">
                <h2>{uniqueShop.name}</h2>
                <div className="x-shopify">
                  <label>Rating</label>
                  <span>15,5rb</span>
                </div>
                <div className="x-shopify">
                  <label>Persentase Chat</label>
                  <span>76%</span>
                </div>
                {/* <div className="x-shopify">
                  <label>Waktu Balas Chat</label>
                  <span>2 jam</span>
                </div> */}
              </div>
                <div className="">
                  <button>Chat Sekarang</button>
                  <button>Kunjungi Toko</button>
                </div>
              </div>
              
            </Col>
          </Row>
        </div>
      )}

      {uniqueShopProducts.length > 0 && (
        <div className="container-shopify" style={{marginTop: '4rem', marginBottom: '0'}}>
          <Row>
            <Col>
              <h2>Produk Lainnya</h2>
            </Col>
          </Row>
          <ProductCard products={uniqueShopProducts} />
        </div>
      )}
      <div className="container-cart">
        <div className="card-cart">
          <Image src={uniqueItem.images[2]} alt={`${uniqueItem.title} image`} />
          <h3>{uniqueShop.name}</h3>
        </div>
        <div className="subtotal">
          <QuantityButton id={uniqueItem.id} onQuantityChange={handleQuantity} type={"cart"} />
          <h4>${uniqueItem.price * quantity}</h4>
        </div>
        <div className="bought-btn">
          <button type="button" aria-label={`Beli ${uniqueItem.title}`}>Beli</button>
          <button className="keranjang" type="button" onClick={addToCart} aria-label={`Tambah ${uniqueItem.title} ke Keranjang`}>+ Keranjang</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
