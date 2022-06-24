import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const transitionNav = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNav);

    return () => {
      window.removeEventListener("scroll", transitionNav);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://cdn2.iconfinder.com/data/icons/christmas-3d/512/avatars_accounts___christmas_santa_claus_santa_man_old_man_winter_season_beard_hat_x-mas.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
