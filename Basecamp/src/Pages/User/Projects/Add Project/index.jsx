import React, { useState } from "react";
import "./addproject.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api, { authHeaders } from "../../../../../backend/api";
import { useNavigate } from "react-router";

const projectValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Project name must be at least 2 characters")
    .required("Project name is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
});

function AddProject() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    setLoading(true);

    try {
      const headers = authHeaders();
      if (!headers.Authorization) {
        navigate("/login");
        return;
      }

      await api.post("/projects", values, { headers });

      navigate("/projects");
    } catch (error) {
      setServerError(
        error.response?.data?.error || "Failed to create project. Please try again."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="add-project">
      <Formik
        initialValues={{ name: "", description: "" }}
        validationSchema={projectValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <h2>New Project</h2>

            {serverError && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {serverError}
              </div>
            )}

            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" />
            {errors.name && touched.name && (
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
              </ErrorMessage>
            )}

            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" id="description" />
            {errors.description && touched.description && (
              <ErrorMessage name="description">
                {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
              </ErrorMessage>
            )}

            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? "Creating..." : "Create Project"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProject;