import { configureStore } from "@reduxjs/toolkit";
import sessionReducers from "./session";
import languageReducers from "./language";
import modelReducers from "./model";
import cartShoppingReducers from "./cartshopping";
import productPopupReducers from "./productPopup";
import modelLoginReducers from "./model.login";
import loadingReducers from "./loading";

export default configureStore({
  reducer: {
    session: sessionReducers,
    language: languageReducers,
    model: modelReducers,
    cartShopping: cartShoppingReducers,
    productPopup: productPopupReducers,
    modelLogin: modelLoginReducers,
    loading: loadingReducers,
  },
});
