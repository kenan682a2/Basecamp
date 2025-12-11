import React, { useState, useEffect } from 'react'
import People from "../../assets/Images/people.png";
import './navbar.css'
import { FaPlus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LuDoorClosed } from "react-icons/lu";
import { NavLink, useNavigate } from 'react-router';
export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

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
                    <NavLink to={`/profile/${user?.id}`}>
                        <div className="nav-edit-profile">
                            <IoSettingsOutline />
                            <p>Edit Profile</p>
                        </div>
                    </NavLink>
                    {user?.isAdmin && (
                        <NavLink to="/admin">
                            <div className="nav-admin">
                                <IoSettingsOutline />
                                <p>Admin Panel</p>
                            </div>
                        </NavLink>
                    )}
                    <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <div className="nav-logout">
                            <LuDoorClosed />
                            <p>Log Out</p>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}
