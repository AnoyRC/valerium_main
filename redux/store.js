"use client";

import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./slice/UserSlice.js";

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
