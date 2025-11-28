import React from 'react'
import People from "../../assets/Images/people.png";
import './navbar.css'
import { FaPlus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LuDoorClosed } from "react-icons/lu";
import { NavLink } from 'react-router';
export default function Navbar() {
    return (
        <nav>
            <div className="nav-all">
           <NavLink to='/projects'>
                 <div className="nav-logo">
                    <img alt="" srcset={People} />
                </div>
           </NavLink>
                <div className="nav-right">
                    <NavLink to='/projects/add'>
                        <div className="nav-add-btn">
                            <FaPlus />
                            <p>Add Project</p>
                        </div>
                    </NavLink>
                    <div className="nav-edit-profile">
                        <IoSettingsOutline />
                        <p>Edit Profile</p>
                    </div>
                    <NavLink to='/'>
                        <div className="nav-logout">
                            <LuDoorClosed />
                            <p>Log Out</p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
