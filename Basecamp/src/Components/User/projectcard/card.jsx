import {
  FiMail,
  FiShare2,
  FiArchive,
  FiTrash2
} from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { IoChatbubbleOutline } from "react-icons/io5";

import "./ProjectCard.css"

export default function ProjectCard({
  title = "New Project",
  email = "example@mail.com",
  description = "Description",
  onDelete = () => {},
  onSettings = () => {},
}) {
  return (
    <div className="pc">
      <div className="pc__header">
        <div className="pc__header-left">
          <span className="pc__title">{title}</span>
       
          <span className="pc__email"><FiMail className="pc__email-icon" />{email}</span>
        </div>
        
        <button className="pc__settings-btn" onClick={onSettings}>
          <IoSettingsOutline size={20} />
        </button>
      </div>

      <div className="pc__content">
        <p className="pc__description">{description}</p>

        <div className="pc__actions">
          <div className="pc__icon-group">
            <button className="pc__icon-btn">
              <BsPeopleFill size={18} />
            </button>

            <button className="pc__icon-btn">
              <FiShare2 size={18} />
            </button>

            <button className="pc__icon-btn">
              <IoChatbubbleOutline size={18} />
            </button>

            <button className="pc__icon-btn">
              <FiArchive size={18} />
            </button>
          </div>

          <button className="pc__delete-btn" onClick={onDelete}>
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
