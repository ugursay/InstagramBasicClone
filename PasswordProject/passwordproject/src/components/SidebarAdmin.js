// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function SidebarAdmim() {
  const { id, email, name, online, updateStatus, isAdmin, setIsAdmin } =
    useUser();
  const navigate = useNavigate();
  updateStatus(id, online);

  const handleLogout = async () => {
    {
      setIsAdmin(false);
      await updateStatus(id, false);
      navigate(`/`);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={`/userpanel/adminprofileedit`}>Profile</Link>
        </li>
        <li>
          <Link to={`/userpanel/allusers`}>All Users</Link>
        </li>
        <li>
          <Link to={`/userpanel/myposts`}></Link>
        </li>
        {/* <li>
          <Link to={`/userpanel/settings`}>Settings</Link>
        </li> */}
      </ul>
      <button onClick={handleLogout} className="login-btn">
        Çıkış Yap
      </button>
    </div>
  );
}

export default SidebarAdmim;
