import { configureStore } from "@reduxjs/toolkit";
import movieTrailerSlice from "../features/movieTrailerSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    movieTrailerSlice: movieTrailerSlice.reducer,
    userSlice: userSlice.reducer,
  },
});
