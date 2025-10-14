import { configureStore, createSlice } from "@reduxjs/toolkit";
import { loadAuthState } from "../storage/authStorage";
import { catalogApi } from "../services/catalogApi";

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware),
});

export const { setUser, clearUser } = authSlice.actions;

export default store;
