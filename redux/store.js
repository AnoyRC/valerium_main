"use client";

import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./slice/UserSlice.js";
import SignupSlice from "./slice/SignupSlice.js";
import chainSlice from "./slice/chainSlice.js";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    chain: chainSlice,
    signup: SignupSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
