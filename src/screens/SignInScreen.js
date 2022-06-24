import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

function SignInScreen(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userInfo) => {
        console.log(userInfo);
      })
      .catch((error) => alert(error.message));
  };

  const signUpClickHandler = () => {
    props.signUpHandler();
  };

  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signUpPage__grey">New to Netflix? </span>
          <span onClick={signUpClickHandler} className="signUpPage__link">
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
export default SignInScreen;
