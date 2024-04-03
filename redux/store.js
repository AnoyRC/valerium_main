"use client";

import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./slice/UserSlice.js";
import SignupSlice from "./slice/SignupSlice.js";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    signup: SignupSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
