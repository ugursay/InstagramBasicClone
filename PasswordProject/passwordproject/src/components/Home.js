import React from "react";
import { useUser } from "../context/UserContext";
// import { useLocation } from "react-router-dom";

function Home() {
  // const location = useLocation();
  // const { email, id, online } = location.state || {};

  const { id, email, name, password, online, updateStatus } = useUser();

  updateStatus(id, online);
  return (
    <div>
      <div className="main">
        <ul>
          <li>ID:{id}</li>
          <li>Mailim:{email}</li>
          <li>Adım:{name}</li>
          <li>Şifrem:{password}</li>
          <li>Aktifliğim:{!online ? "false" : "true"}</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
