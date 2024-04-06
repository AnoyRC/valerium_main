"use client";

import { configureStore } from "@reduxjs/toolkit";

import SignupSlice from "./slice/SignupSlice.js";
import chainSlice from "./slice/chainSlice.js";
import userSlice from "./slice/UserSlice.js";

export const store = configureStore({
  reducer: {
    chain: chainSlice,
    signup: SignupSlice,
    user: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
