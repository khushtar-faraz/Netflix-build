import { createSlice } from "@reduxjs/toolkit";

export const movieTrailerSlice = createSlice({
  name: "movieTrailer",
  initialState: { movieTrailerUrl: "" },

  reducers: {
    setMovieTrailer(state, action) {
      if (state.movieTrailerUrl === "") {
        state.movieTrailerUrl = action.payload;
      } else {
        state.movieTrailerUrl = "";
      }
    },
  },
});

export const movieTrailerActions = movieTrailerSlice.actions;

export default movieTrailerSlice;
