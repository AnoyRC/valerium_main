import { createSlice } from "@reduxjs/toolkit";

const gasTokenSlice = createSlice({
  name: "gasToken",

  initialState: {
    price: 0,
  },

  reducers: {
    setGasToken: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { setGasToken } = gasTokenSlice.actions;

export default gasTokenSlice.reducer;
