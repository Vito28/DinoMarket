import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../public/store"
import Navigation from "./Components/Naviagtion";
import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResults";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        {/* <button className="clear" style={{marginTop: '200px', zIndex: '999'}} onClick={() => localStorage.clear()}>Clear</button> */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/search/:value" element={<SearchResult />} />
          <Route path="/shop/:id" element={<Shop/>} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
