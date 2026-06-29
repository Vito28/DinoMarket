import { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Spinner } from "react-bootstrap";
import store from "./store";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";

const Home = lazy(() => import("./Pages/Home"));
const SearchResult = lazy(() => import("./Pages/SearchResults"));
const Cart = lazy(() => import("./Pages/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Shop = lazy(() => import("./Pages/Shop"));
const NotFound = lazy(() => import("./Pages/404"));
const Orders = lazy(() => import("./Pages/Orders"));
const Settings = lazy(() => import("./Pages/Settings"));
const Help = lazy(() => import("./Pages/Help"));
const Terms = lazy(() => import("./Pages/Terms"));
const Privacy = lazy(() => import("./Pages/Privacy"));
const AuthPage = lazy(() => import("./Pages/AuthPage"));

const PageLoader = () => (
  <div className="py-5 text-center" role="status" aria-live="polite">
    <Spinner animation="border" variant="primary" />
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <a href="#main-content" className="skip-link">
            Lewati ke konten utama
          </a>
          <Navigation />
          <div id="main-content" className="flex-grow-1" tabIndex={-1}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/search/:value" element={<SearchResult />} />
                <Route path="/shop/:id" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/login" element={<AuthPage mode="signin" />} />
                <Route path="/register" element={<AuthPage mode="signup" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
