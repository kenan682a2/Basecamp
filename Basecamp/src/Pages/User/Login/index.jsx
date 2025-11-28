import React from "react";
import "./login.css";
import People from "../../../assets/Images/people.png";
import { NavLink } from "react-router";
export default function Login() {
  return (
    <main>
      <div className="main-up">
        <img id="img1" src={People} alt="people" />
        <p>Login</p>
      </div>

      <div className="form">
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" />

          <button type="submit">Login</button>

          <p>
            Not a member? <NavLink to='/signup'>Sign Up</NavLink>
          </p>
        </form>
      </div>
    </main>
  );
}
