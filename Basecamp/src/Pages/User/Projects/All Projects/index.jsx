import React, { useEffect, useState } from "react";
import "./allprojects.css";
import { GoNorthStar } from "react-icons/go";
import { LiaPenAltSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import ProjectCard from "../../../../Components/User/projectcard/card";
import axios from "axios";
import { useNavigate } from "react-router";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:3000/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(response.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error || "Failed to fetch projects"
      );
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(projects.filter((p) => p.id !== id));
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  if (loading) return <section id="allprojects"><h1>Loading...</h1></section>;

  return (
    <section id="allprojects">
      <h1>Projects</h1>
      <div className="sortprojects">
        <div className="allb">
          <button id="all-btn">
            <GoNorthStar /> All projects
          </button>
          <button id="crt-btn">
            <LiaPenAltSolid />
            Created by me
          </button>
          <button id="shr-btn">
            <IoPeopleOutline />
            Shared with me
          </button>
        </div>
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      {projects.length === 0 ? (
        <p>No projects found. Create one to get started!</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectCard
                id={project.id}
                title={project.name}
                description={project.description}
                onDelete={() => handleDeleteProject(project.id)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

