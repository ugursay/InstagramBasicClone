import React from "react";
import { useUser } from "../context/UserContext";
import "../styles/Profile.css";
import { Navigate, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

function Profile() {
  // const location = useLocation();
  // const { email, id, online } = location.state || {};
  const navigate = useNavigate();
  const {
    id,
    setId,
    email,
    setEmail,
    realName,
    setRealName,
    name,
    setName,
    bio,
    setBio,
    image,
    setImage,
    password,
    setPassword,
    online,
    setOnline,
    updateStatus,
    updateBio,
  } = useUser();

  setImage("https://avatars.githubusercontent.com/u/31919688?v=4");
  setBio(
    "lorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsulorem ipsu"
  );
  updateStatus(id, online);
  updateBio(id, bio);
  const profileEditButton = () => {
    navigate("profileedit");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img className="profile-image" src={image} alt="Profil" />
        <h1 className="profile-name">{realName}</h1>
        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>
        <p className="profile-bio">{bio}</p>
        <p className="profile-bio">
          Aktifliğim: {!online ? "Çevrimdışı" : "Çevrimiçi"}
        </p>
        <button onClick={profileEditButton} className="edit-button">
          Profili Düzenle
        </button>
      </div>
    </div>
  );
}

export default Profile;
