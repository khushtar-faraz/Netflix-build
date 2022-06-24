import React from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";
import useYoutube from "../hooks/useYoutube";
import "./Modal.css";
import { useDispatch } from "react-redux";
import { movieTrailerActions } from "../features/movieTrailerSlice";

function Modal() {
  const dispatch = useDispatch();

  const backdropClickHandler = () => {
    dispatch(movieTrailerActions.setMovieTrailer(""));
  };
  function Backdrop(props) {
    return <div className="backdrop" onClick={backdropClickHandler}></div>;
  }

  function ModalOverlay(props) {
    const { movieTrailerUrl, opts } = useYoutube();
    return (
      <div className="modal">
        {<YouTube className="videoBox" videoId={movieTrailerUrl} opts={opts} />}
      </div>
    );
  }

  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)};
      {ReactDOM.createPortal(<ModalOverlay />, portalElement)};
    </>
  );
}

export default Modal;
