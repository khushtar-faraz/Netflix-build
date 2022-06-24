import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { useDispatch } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const dispatch = useDispatch();
  const movieTrailerUrl = useSelector(
    (state) => state.movieTrailerSlice.movieTrailerUrl
  );
  const user = useSelector((state) => state.userSlice.user);
  const userSubscription = useSelector(
    (state) => state.userSlice.userSubscription
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        dispatch(
          login({
            id: user.uid,
            email: user.email,
          })
        );
      } else {
        // User is signed out.
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="app">
      {movieTrailerUrl && <Modal />}
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/" exact>
              {userSubscription == null ? (
                <Redirect to="/profile" />
              ) : (
                <HomeScreen />
              )}
            </Route>

            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="*">
              <h1 style={{ color: "white" }}>404 Not Found</h1>
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
