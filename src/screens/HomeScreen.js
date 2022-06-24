import React from "react";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Row from "../components/Row";
import requests from "../Requests";

function HomeScreen(props) {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        isLarge={true}
        fetchURL={requests.fetchNetflixOriginals}
      />
      <Row
        title="Trending Now"
        isLarge={false}
        fetchURL={requests.fetchTrending}
      />
      <Row
        title="Top Rated"
        isLarge={false}
        fetchURL={requests.fetchTopRated}
      />
      <Row
        title="Action Movies"
        isLarge={false}
        fetchURL={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        isLarge={false}
        fetchURL={requests.fetchComedyMovies}
      />
      <Row
        title="Horror Movies"
        isLarge={false}
        fetchURL={requests.fetchHorrorMovies}
      />
      <Row
        title="Romance Movies"
        isLarge={false}
        fetchURL={requests.fetchRomanceMovies}
      />
      <Row
        title="Documentaries"
        isLarge={false}
        fetchURL={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default HomeScreen;
