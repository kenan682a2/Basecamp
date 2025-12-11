import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/auth/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="profile-container">Loading...</div>;
  if (error) return <div className="profile-container error">{error}</div>;
  if (!user) return <div className="profile-container">User not found</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <div className="info-field">
            <label>Name:</label>
            <p>{user.name}</p>
          </div>
          <div className="info-field">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="info-field">
            <label>Status:</label>
            <p>{user.isAdmin ? "Admin" : "User"}</p>
          </div>
        </div>
        <button onClick={() => navigate("/projects")} className="back-btn">
          Back to Projects
        </button>
      </div>
    </div>
  );
}
