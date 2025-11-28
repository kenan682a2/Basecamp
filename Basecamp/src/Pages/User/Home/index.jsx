import React from "react";
import "./home.css";
import People from "../../../assets/Images/people.png";
import { NavLink } from "react-router";
export default function Main() {
  return (
    <main>
      <div className="main-up">
        <img id="img1" srcSet={People} alt="people" />
        <h2>COLLABORATE</h2>
        <p>A project management tool for developers</p>
      </div>

      <div className="main-low">
        <NavLink to='/signup'> <button id="signup">Sign Up</button></NavLink>
        <NavLink to='/login'> <button id="login">Login</button></NavLink>
      </div>
    </main>
  );
}
