import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    walletAddresses: null,
    tokenBalanceData: null,
    tokenConversionData: null,
  },

  reducers: {
    setWalletAddresses: (state, action) => {
      state.walletAddresses = action.payload;
    },

    setTokenBalanceData: (state, action) => {
      state.tokenBalanceData = action.payload;
    },

    setTokenConversionData: (state, action) => {
      state.tokenConversionData = action.payload;
    },
  },
});

export const {
  setWalletAddresses,
  setTokenBalanceData,
  setTokenConversionData,
} = userSlice.actions;

export default userSlice.reducer;
