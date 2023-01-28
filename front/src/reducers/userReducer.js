import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload.userSend;
      state.accessToken = actions.payload.token;
      state.refreshToken = actions.payload.refreshToken;
    },
    logout: (state, actions) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateTokens: (state, actions) => {
      
      state.accessToken = actions.payload.accessToken;
      state.refreshToken= actions.payload.refreshToken;
    },
  },
});

export const { setUser, logout, updateTokens } = userSlice.actions;
export default userSlice.reducer;
