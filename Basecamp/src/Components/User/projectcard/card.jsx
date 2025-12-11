import {
  FiShare2,
  FiArchive,
  FiTrash2,
  FiEdit2
} from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { IoChatbubbleOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import "./ProjectCard.css"

export default function ProjectCard({
  id = null,
  title = "New Project",
  description = "Description",
  onDelete = () => {},
  onSettings = () => {},
}) {
  const navigate = useNavigate();

  return (
    <div className="pc">
      <div className="pc__header">
        <div className="pc__header-left">
          <span className="pc__title">{title}</span>
        </div>
        
        <button 
          className="pc__settings-btn" 
          onClick={() => id && navigate(`/projects/${id}/edit`)}
        >
          <FiEdit2 size={20} />
        </button>
      </div>

      <div className="pc__content">
        <p className="pc__description">{description}</p>

        <div className="pc__actions">
          <div className="pc__icon-group">
            <div className=".pc_icons">
              <BsPeopleFill size={18} />
            </div>

            <button className="pc__icon-btn">
              0
            </button>

            <div className=".pc_icons">
              <IoChatbubbleOutline size={18} />
            </div>

            <button className="pc__icon-btn">
              0
            </button>
          </div>

          <button 
            className="pc__delete-btn" 
            onClick={onDelete}
            title="Delete project"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
