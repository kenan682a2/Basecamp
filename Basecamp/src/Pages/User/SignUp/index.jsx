import React, { useState } from "react";
import "./signup.css";
import usersImg from "../../../assets/Images/people.png";
import { NavLink, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../api";

const signupValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConf: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConf: values.passwordConf,
      });
      navigate("/login");
    } catch (error) {
      setServerError(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="img">
        <img src={usersImg} alt="users" />
      </div>

      <h2>Sign up</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConf: "",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {serverError && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {serverError}
              </div>
            )}

            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            {errors.name && touched.name && (
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
              </ErrorMessage>
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

            <label htmlFor="passwordConf">Password Confirmation</label>
            <Field type="password" name="passwordConf" />
            {errors.passwordConf && touched.passwordConf && (
              <ErrorMessage name="passwordConf">
                {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
              </ErrorMessage>
            )}

            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? "Creating account..." : "Sign up"}
            </button>

            <p>
              Already a member? <NavLink to="/login">Login</NavLink>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
