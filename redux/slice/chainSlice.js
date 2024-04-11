import { createSlice } from "@reduxjs/toolkit";

const chainSlice = createSlice({
  name: "chain",

  initialState: {
    currentChain: {
      chainId: 1891,
      chainName: "Optimism",
      isBase: true,
      rpcUrl: "https://replicator.pegasus.lightlink.io/rpc/v1",
      convert_id: "2781",
      id: "1027",
      symbol: "ETH",
      logo: "/eth-logo.svg",
      addresses: {
        Valerium: "0x0560f6B73E570b4eCD2018E4AC450E773E60bED5",
        ValeriumForwarder: "0x16BB4A38944d00821bb15dBc2BACd8Ad0F57d8F0",
        FactoryForwarder: "0xAf02c5B217214bCecA60257A038E9BBcF02b92db",
        ValeriumProxyFactory: "0x8B9EeB8d12C85EE73d3ae6FaB0d0726625C80e7d",
        ValeriumVault: "0x1FdD0B22E4208F6CeE8F8C1Bdbf28bBBc359A86F",
        PasswordVerifier: "0x8c196a2cd0d097CE21726a6D8D6ccb56Cbcb8274",
        SignatureVerifier: "0x248263304f8B869A7645Dc2510bA5B2A8bA03795",
      },
      style: {
        baseTextColor: "#FFFFFF",
        colorDark: "#FF0420",
        colorLight: "#FF0420",
        gradientColorDark:
          "linear-gradient(93deg, rgba(255, 4, 32, 0.40) 0%, rgba(153, 2, 19, 0.40) 100%)",
        gradientColorLight:
          "linear-gradient(93deg, rgba(255, 4, 32, 0.80) 0%, rgba(153, 2, 19, 0.80) 100%)",
        backgroundColorDark: "rgba(255, 4, 32, 0.40)",
        backgroundColorLight: "rgba(255, 4, 32, 0.20)",
        backgroundShadowEffect:
          "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(255, 74, 94, 0.00) 60%, rgba(255, 4, 32, 0.80) 100%)",
        logo: "/optimism-logo.svg",
      },
      tokens: [
        {
          name: "ETH",
          symbol: "ETH",
          address: null,
          convert_id: "1027",
          usd_id: "2781",
          decimals: 18,
          logo: "/eth-logo.svg",
        },
        {
          name: "BNB",
          symbol: "BNB",
          address: "0x60d7966bdf03f0Ec0Ac6de7269CE0E57aAd6e9c2",
          convert_id: "1839",
          usd_id: "2781",
          decimals: 18,
          logo: "/bnb-logo.svg",
        },
      ],
    },
  },

  reducers: {
    setCurrentChain: (state, action) => {
      state.currentChain = action.payload;
    },
  },
});

export const { setCurrentChain } = chainSlice.actions;

export default chainSlice.reducer;
