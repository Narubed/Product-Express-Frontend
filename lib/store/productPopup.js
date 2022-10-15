import { createSlice } from "@reduxjs/toolkit";
// import { takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import CartPopup from "~/components/features/product/common/cart-popup";

export const productPopupSlice = createSlice({
  name: "cartShopping",
  initialState: {
    productPopup: [],
  },
  reducers: {
    setProductPopup: (state, action) => {
      const product = action.payload;
      console.log(product);
      toast(<CartPopup product={product} />);
      console.log(state);
      return {
        ...state,
        productPopup: action.payload,
      };
    },
  },
});

export const { setProductPopup } = productPopupSlice.actions;

export default productPopupSlice.reducer;
