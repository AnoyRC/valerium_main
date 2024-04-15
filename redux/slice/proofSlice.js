import { createSlice } from "@reduxjs/toolkit";

const proofSlice = createSlice({
  name: "proof",

  initialState: {
    txProof: null,
    recoveryProof: null,
    proofDrawer: false,
    recoveryDrawer: false,
    type: null,
    isLoading: false,
    email: null,
    password: null,
    passkey: null,
  },

  reducers: {
    setTxProof: (state, action) => {
      state.txProof = action.payload;
    },

    setRecoveryProof: (state, action) => {
      state.recoveryProof = action.payload;
    },

    toggleProofDrawer: (state) => {
      state.proofDrawer = !state.proofDrawer;
    },

    toggleRecoveryDrawer: (state) => {
      state.recoveryDrawer = !state.recoveryDrawer;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setPasskey: (state, action) => {
      state.passkey = action.payload;
    },
  },
});

export const {
  setTxProof,
  setRecoveryProof,
  toggleProofDrawer,
  toggleRecoveryDrawer,
  setType,
  setLoading,
  setEmail,
  setPassword,
  setPasskey,
} = proofSlice.actions;

export default proofSlice.reducer;
