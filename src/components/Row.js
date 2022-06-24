import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import useYoutube from "../hooks/useYoutube";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const { handleClick } = useYoutube();

  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(props.fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchMovies();
  }, [props.fetchURL]);

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((props.isLarge && movie.poster_path) ||
              (!props.isLarge && movie.backdrop_path)) && (
              <img
                className={`row__poster ${props.isLarge && "row__posterLarge"}`}
                key={movie.id}
                onClick={() => handleClick(movie)}
                src={`${baseURL}${
                  props.isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
