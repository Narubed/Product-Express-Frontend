import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "model",
  initialState: {
    quickview: false,
  },
  reducers: {
    setQuickview: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        quickview: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuickview } = modalsSlice.actions;

export default modalsSlice.reducer;
