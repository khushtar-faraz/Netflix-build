import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, userSubscription: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userSubscription = null;
    },

    setUserSubscription: (state, action) => {
      state.userSubscription = action.payload;
    },
  },
});

export const { login, logout, setUserSubscription } = userSlice.actions;
export default userSlice;
