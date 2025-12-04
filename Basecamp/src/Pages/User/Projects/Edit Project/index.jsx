import { useState } from "react"
import "./edit-project.css"

export default function EditProjectForm() {
  const [projectName, setProjectName] = useState("New Project!!")
  const [description, setDescription] = useState("New edited Description")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [members, setMembers] = useState([])

  const handleAddMember = () => {
    if (email.trim()) {
      setMembers([...members, { id: Date.now(), email, isAdmin }])
      setEmail("")
      setIsAdmin(false)
    }
  }

  const handleRemoveMember = (id) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  const handleUpdateName = () => {
    console.log("Project name updated:", projectName)
  }

  const handleUpdateDescription = () => {
    console.log("Description updated:", description)
  }

  return (
    <div className="edit-project-wrapper">
      <div className="main-content">
        <div className="header-content">
          <h1 className="page-title">Edit Project</h1>
          <p className="created-by">Created by: todo@gmail.com</p>
        </div>

        <div className="form-section">
          <label className="form-label">Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
            <button className="btn btn-secondary" onClick={handleUpdateName}>
              Update Name
            </button>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Description</label>
          <div className="input-group">
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows="4"
            />
            <button className="btn btn-secondary" onClick={handleUpdateDescription}>
              Update Description
            </button>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Add Member (email)</label>
          <div className="member-input-group">
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter member email"
              onKeyPress={(e) => e.key === "Enter" && handleAddMember()}
            />
            <div className="member-controls">
              <label className="admin-toggle">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="admin-label">Admin</span>
              </label>
              <button className="btn btn-add" onClick={handleAddMember}>
                +
              </button>
            </div>
          </div>
        </div>

        {members.length > 0 && (
          <div className="members-list">
            <h3 className="members-title">Members ({members.length})</h3>
            <ul className="members">
              {members.map((member) => (
                <li key={member.id} className="member-item">
                  <div>
                    <span className="member-email">{member.email}</span>
                    {member.isAdmin && <span className="member-role admin">Admin</span>}
                  </div>
                  <button
                    className="btn"
                    onClick={() => handleRemoveMember(member.id)}
                    style={{ background: "transparent", color: "#999", padding: "4px 8px" }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <aside className="action-sidebar">
        <button className="btn btn-primary">Project Overview</button>
        <button className="btn btn-danger">Delete Project</button>
      </aside>
    </div>
  )
}
