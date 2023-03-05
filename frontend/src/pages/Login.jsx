import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    axios
      .post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      .then((result) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          ref={userRef}
          className="loginInput"
          type="text"
          placeholder="Enter your UserName..."
        />
        <label>Password</label>
        <input
          ref={passwordRef}
          className="loginInput"
          type="password"
          placeholder="Enter your Password..."
        />
        <button disabled={isFetching} className="loginButton">
          Login
        </button>
      </form>
      <Link className="link" to={"/register"}>
        <button className="registerLoginButton">Register</button>
      </Link>
    </div>
  );
}
