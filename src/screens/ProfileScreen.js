import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Nav from "../components/Nav";
import { auth } from "../firebase";
import PlansScreen from "./PlansScreen";
import "./ProfileScreen.css";

function ProfileScreen(props) {
  const history = useHistory();
  const user = useSelector((state) => state.userSlice.user);
  const userSubscription = useSelector(
    (state) => state.userSlice.userSubscription
  );

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://cdn2.iconfinder.com/data/icons/christmas-3d/512/avatars_accounts___christmas_santa_claus_santa_man_old_man_winter_season_beard_hat_x-mas.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user?.email}</h2>
            <div className="profileScreen__plans">
              <h3>
                Plans{" "}
                {userSubscription !== null &&
                  `(Current Plan: ${userSubscription.role})`}
              </h3>
              <PlansScreen />
              <button
                onClick={() => {
                  auth.signOut();
                  history.replace("/");
                }}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
