import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, userSubscription: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("USER",JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null;
      state.userSubscription = null;
      localStorage.setItem("USER",null)
      localStorage.setItem("SUBSCRIPTION",null)
    },

    setUserSubscription: (state, action) => {
      state.userSubscription = action.payload;
      localStorage.setItem("SUBSCRIPTION",JSON.stringify(action.payload))
    },
  },
});

export const { login, logout, setUserSubscription } = userSlice.actions;
export default userSlice;
