import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null
  },
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload)
      state.user = payload;
      state.accessToken = payload;
      state.refreshToken = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
  
