import { createSlice } from "@reduxjs/toolkit";

const chainSlice = createSlice({
  name: "chain",

  initialState: {
    currentChain: {
      baseTextColor: "#FFFFFF",
      colorDark: "#0052FF",
      colorLight: "#0052FF",
      gradientColorDark:
        "linear-gradient(93deg, rgba(0, 82, 255, 0.40) 0%, rgba(0, 49, 153, 0.40) 100%)",
      gradientColorLight:
        "linear-gradient(93deg, rgba(0, 82, 255, 0.80) 0%, rgba(0, 49, 153, 0.80) 100%)",
      backgroundColorDark: "rgba(0, 82, 255, 0.40)",
      backgroundColorLight: "rgba(0, 82, 255, 0.20)",
      backgroundShadowEffect:
        "rgba(255, 255, 255, 0.00) -117.12%, rgba(85, 140, 255, 0.00) 65.14%, rgba(0, 82, 255, 0.60) 100%)",
      logo: "/tokens/base-logo.svg",
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
