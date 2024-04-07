import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    walletAddresses: null,
    balanceData: null,
    conversionData: null,
    currentBalanceData: null,
    currentConversionData: null,
    tokenBalanceData: null,
    tokenConversionData: null,
  },

  reducers: {
    setWalletAddresses: (state, action) => {
      state.walletAddresses = action.payload;
    },
    setBalanceData: (state, action) => {
      state.balanceData = action.payload;
    },
    setConversionData: (state, action) => {
      state.conversionData = action.payload;
    },
    setCurrentBalanceData: (state, action) => {
      state.currentBalanceData = action.payload;
    },
    setCurrentConversionData: (state, action) => {
      state.currentConversionData = action.payload;
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
  setBalanceData,
  setConversionData,
  setWalletAddresses,
  setCurrentBalanceData,
  setCurrentConversionData,
  setTokenBalanceData,
  setTokenConversionData,
} = userSlice.actions;

export default userSlice.reducer;
