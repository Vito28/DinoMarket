import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Search from "./Search";
import "../assets/Style/Components/Navigation.scss";
import AuthButton from "./AuthButton";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="main" aria-label="Main Navigation">
      <nav className="navbar-top" aria-label="Top Navigation">
        <Link to="/">Tentang Tokovito</Link>
        <Link to="/">Produk</Link>
        <Link to="/">Promo</Link>
        <Link to="/">Kontak</Link>
        <Link to="/">Tentang Kami</Link>
        <Link to="/">Bantuan</Link>
      </nav>
      <nav className="navbar-bottom" aria-label="Bottom Navigation">
        <div className="logo-website">
          <img src="path-to-your-image.jpg" alt="Logo Tokovito" />
        </div>
        <Search />
        <button
          className="cart"
          onClick={() => navigate('/cart')}
          aria-label="Go to shopping cart"
        >
          <FaShoppingCart />
        </button>
        <AuthButton />
      </nav>
    </nav>
  );
};

export default Navigation;
