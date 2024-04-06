import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    walletAddresses: null,
    balanceData: null,
    conversionData: null,
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
  },
});

export const { setBalanceData, setConversionData, setWalletAddresses } =
  userSlice.actions;

export default userSlice.reducer;
