// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Sidebar() {
  const { id, email, name, online, updateStatus } = useUser();
  const navigate = useNavigate();
  updateStatus(id, online);

  const handleLogout = async () => {
    await updateStatus(id, false);
    navigate(`/`);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={`/userpanel/profile`}>Profile</Link>
        </li>

        <li>
          <Link to={`/userpanel/settings`}>Settings</Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="login-btn">
        Çıkış Yap
      </button>
    </div>
  );
}

export default Sidebar;
