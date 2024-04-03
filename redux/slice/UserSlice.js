import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    domain: "",
    address: "",
  },

  reducers: {
    setUser: (state, action) => {
      state.domain = action.payload.domain;
      state.address = action.payload.address;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
