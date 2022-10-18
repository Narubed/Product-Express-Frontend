import { createSlice } from "@reduxjs/toolkit";

export const whiteListSlice = createSlice({
  name: "whitelist",
  initialState: {
    whitelist: [],
  },
  reducers: {
    setWhiteList: (state, action) => {
      return {
        ...state,
        whitelist: action.payload,
      };
    },
  },
});

export const { setWhiteList } = whiteListSlice.actions;

export default whiteListSlice.reducer;
