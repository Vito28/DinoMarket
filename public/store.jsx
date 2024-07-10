import { configureStore, createSlice } from "@reduxjs/toolkit";
import product from "./product.json";

const initialAuthState = {
  isSignUp: JSON.parse(localStorage.getItem("isSignUp")) || false,
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
};

const initialDataState = {
  products: product,
  shops: product.map(data => data.shop)
                .filter((shop, index, self) =>
                  index === self.findIndex(s => s.id === shop.id))
}

const initialProductId = {
  id: null,
}

// const initialCartState = {
//   quantity: JSON.parse.getItem("")
// }

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setSignUp: state => {
      state.isSignUp = true;
      localStorage.setItem("isSignUp", "true");
    },
    setLogin: state => {
      state.isLogin = true;
      localStorage.setItem("isLogin", "true");
    },
    setSignOut: state => {
      state.isSignUp = false;
      state.isLogin = false;
      localStorage.setItem("isSignUp", "false");
      localStorage.setItem("isLogin", "false");
    },
  },
});

const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {}
})

const productIdSlice = createSlice({
  name: "productId",
  initialState: initialProductId,
  reducers: {
    setProductId: state => {
      localStorage.setItem("")
    }
  }
})

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
  },
});

export const { setSignUp, setLogin, setSignOut } = authSlice.actions;

export default store;
