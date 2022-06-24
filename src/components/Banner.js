import axios from "../axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import "./Banner.css";
import useYoutube from "../hooks/useYoutube";

function Banner(props) {
  const [movie, setMovie] = useState([]);
  const { handleClick } = useYoutube();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <div className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </div>
        <div className="banner__buttons">
          <button className="banner__button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner__button">Add to list</button>
        </div>
        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
