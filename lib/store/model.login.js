import { createSlice } from "@reduxjs/toolkit";

export const modalsLoginSlice = createSlice({
  name: "modelLogin",
  initialState: {
    modelLogin: false,
  },
  reducers: {
    setModelLogin: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        modelLogin: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModelLogin } = modalsLoginSlice.actions;

export default modalsLoginSlice.reducer;
