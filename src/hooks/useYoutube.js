import movieTrailer from "movie-trailer";
import { useSelector, useDispatch } from "react-redux";
import { movieTrailerActions } from "../features/movieTrailerSlice";

function useYoutube() {
  const dispatch = useDispatch();
  const movieTrailerUrl = useSelector(
    (state) => state.movieTrailerSlice.movieTrailerUrl
  );

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (movieTrailerUrl === "") {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URL(url).searchParams;
          dispatch(movieTrailerActions.setMovieTrailer(urlParams.get("v")));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      dispatch(movieTrailerActions.setMovieTrailer(""));
    }
  };
  return { movieTrailerUrl, opts, handleClick };
}

export default useYoutube;
