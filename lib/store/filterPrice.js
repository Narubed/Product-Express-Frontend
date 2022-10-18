import { createSlice } from "@reduxjs/toolkit";

export const filterPriceSlice = createSlice({
  name: "filterPrice",
  initialState: {
    price: [10, 50000],
  },
  reducers: {
    setFilterPrice: (state, action) => {
      return {
        ...state,
        price: action.payload,
      };
    },
  },
});

export const { setFilterPrice } = filterPriceSlice.actions;

export default filterPriceSlice.reducer;
