import React from "react";
import "./signup.css";
import usersImg from "../../../assets/Images/people.png";
import { NavLink } from "react-router";
export default function Signup() {
  return (
    <div className="container">
      <div className="img">
        <img src={usersImg} alt="users" />
      </div>

      <h2>Sign up</h2>

      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <label htmlFor="passwordConf">Password Confirmation</label>
        <input type="password" name="passwordConf" />

        <button type="submit">Sign up</button>

        <p>
          Already a member? <NavLink to='/login'>Login</NavLink>
        </p>
      </form>
    </div>
  );
}
