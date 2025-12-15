import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./admin.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/auth/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load projects");
    }
  };

  const handleSetAdmin = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/auth/user/${userId}/setadmin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("User promoted to admin");
      fetchUsers();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to set admin");
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/auth/user/${userId}/removeadmin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Admin permission removed");
      fetchUsers();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to remove admin");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:3000/auth/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage("User deleted successfully");
        fetchUsers();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete user");
      }
    }
  };

  const handleEditProject = (projectId) => {
    navigate(`/projects/${projectId}/edit`);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMessage("Project deleted successfully");
        fetchProjects();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete project");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={() => navigate("/projects")} className="back-btn">
          Back to Projects
        </button>
      </div>

      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} 
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} 
          onClick={() => setActiveTab('projects')}
        >
          Manage Projects
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {activeTab === 'users' && (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.isAdmin ? "admin" : "user"}`}>
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="actions">
                    {user.isAdmin ? (
                      <button
                        onClick={() => handleRemoveAdmin(user.id)}
                        className="btn btn-warning"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSetAdmin(user.id)}
                        className="btn btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="projects-management">
          <h2>Projects Management</h2>
          <div className="projects-categories">
            <div className="category">
              <h3>Admin-Only Projects</h3>
              <ul>
                {projects.filter(p => p.isAdminOnly).map(project => (
                  <li key={project.id} className="project-item">
                    <span>{project.name} - {project.description}</span>
                    <div className="project-actions">
                      <button onClick={() => handleEditProject(project.id)} className="btn btn-primary">Edit</button>
                      <button onClick={() => handleDeleteProject(project.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="category">
              <h3>Public Projects</h3>
              <ul>
                {projects.filter(p => !p.isAdminOnly).map(project => (
                  <li key={project.id} className="project-item">
                    <span>{project.name} - {project.description}</span>
                    <div className="project-actions">
                      <button onClick={() => handleEditProject(project.id)} className="btn btn-primary">Edit</button>
                      <button onClick={() => handleDeleteProject(project.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
