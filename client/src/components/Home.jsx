import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="header">
        <h1>TO-DO</h1>
        <h3>Let's Priortize Your Task</h3>
      </div>
      <div className="nav-links">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
        <Link to={"/register"} className="nav-link">
          Register
        </Link>
      </div>
    </>
  );
}
