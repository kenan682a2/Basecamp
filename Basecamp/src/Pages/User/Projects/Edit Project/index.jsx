import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./edit-project.css"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { getCurrentUser } from "../../../../../backend/api"

const editProjectValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Project name must be at least 2 characters")
    .required("Project name is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
})

export default function EditProjectForm() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
        return
      }

      const response = await axios.get(
        `http://localhost:3000/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProject(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch project")
      setLoading(false)
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token")
      await axios.patch(
        `http://localhost:3000/projects/${projectId}`,
        {
          name: values.name,
          description: values.description,
          isAdminOnly: values.isAdminOnly,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      navigate("/projects")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update project")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`http://localhost:3000/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        navigate("/projects")
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete project")
      }
    }
  }

  if (loading) return <div className="edit-project-wrapper"><p>Loading...</p></div>

  if (!project) {
    return (
      <div className="edit-project-wrapper">
        <p>{error || "Project not found"}</p>
      </div>
    )
  }

  return (
    <div className="edit-project-wrapper">
      <div className="main-content">
        <div className="header-content">
          <h1 className="page-title">Edit Project</h1>
        </div>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <Formik
          initialValues={{
            name: project.name || "",
            description: project.description || "",
            isAdminOnly: project.isAdminOnly || false,
          }}
          validationSchema={editProjectValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="form-section">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <div className="input-group">
                  <Field
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter project name"
                  />
                  {errors.name && touched.name && (
                    <ErrorMessage name="name">
                      {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="form-section">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <div className="input-group">
                  <Field
                    as="textarea"
                    name="description"
                    className="form-textarea"
                    placeholder="Enter project description"
                    rows="4"
                  />
                  {errors.description && touched.description && (
                    <ErrorMessage name="description">
                      {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              {getCurrentUser() && getCurrentUser().isAdmin && (
                <div className="form-section">
                  <label className="form-label" htmlFor="isAdminOnly">
                    <Field type="checkbox" name="isAdminOnly" id="isAdminOnly" />
                    Admin Only
                  </label>
                </div>
              )}

              <div style={{ marginTop: "20px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <aside className="action-sidebar">
        <button className="btn btn-danger" onClick={handleDeleteProject}>
          Delete Project
        </button>
      </aside>
    </div>
  )
}
