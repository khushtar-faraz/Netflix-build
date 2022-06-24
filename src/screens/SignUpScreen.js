import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

function SignUpScreen(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(function (userInfo) {
        console.log(userInfo);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign Up</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <input type="text" placeholder="Confirm Password" />
        <button type="submit" onClick={register}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpScreen;
