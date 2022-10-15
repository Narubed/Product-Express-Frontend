import { createSlice } from "@reduxjs/toolkit";

export const cartShoppingSlice = createSlice({
  name: "cartShopping",
  initialState: {
    shopping: [],
  },
  reducers: {
    setCartShopping: (state, action) => {
      return {
        ...state,
        shopping: action.payload,
      };
    },
  },
});

export const { setCartShopping } = cartShoppingSlice.actions;

export default cartShoppingSlice.reducer;
