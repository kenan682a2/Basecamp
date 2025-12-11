import React, { useState } from "react";
import "./login.css";
import People from "../../../assets/Images/people.png";
import { NavLink, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../api";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email: values.email, password: values.password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Redirect explicitly to port 5173 projects page
      window.location.href = "http://localhost:5173/projects";
    } catch (error) {
      setServerError(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main>
      <div className="main-up">
        <img id="img1" src={People} alt="people" />
        <p>Login</p>
      </div>

      <div className="form">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {serverError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {serverError}
                </div>
              )}

              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              {errors.email && touched.email && (
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                </ErrorMessage>
              )}

              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              {errors.password && touched.password && (
                <ErrorMessage name="password">
                  {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                </ErrorMessage>
              )}

              <button type="submit" disabled={isSubmitting || loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p>
                Not a member? <NavLink to="/signup">Sign Up</NavLink>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
