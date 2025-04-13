import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import "../styles/Profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../toast/Toast";
// import { useLocation } from "react-router-dom";

function AllUsers() {
  // const location = useLocation();
  // const { email, id, online } = location.state || {};
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [wrapAllCards, setWrapAllCards] = useState(12);

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

  // const profileEditButton = () => {
  //   navigate("profileedit");
  // };

  setImage("https://avatars.githubusercontent.com/u/31919688?v=4");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users`);
        setUsers(response.data);
      } catch (error) {
        console.log("Hata meydana geldi", error);
      }
    };
    fetchData();
  }, [users.length]);

  const deleteUser = async (deleteId, isAdminMail, userName) => {
    if (isAdminMail !== email) {
      try {
        await axios.delete(`http://localhost:5000/users/${deleteId}`);
        setUsers((prev) => prev.filter((user) => user.id !== deleteId));
        setMessage(`Kullanıcı Silindi: ${userName}`);
        setShowToast(true);
      } catch (error) {
        console.log("Kullanıcı Silinemedi", error);
      }
    } else {
      setMessage(`ADMİN SİLİNEMEZ!  ${userName}`);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (users.length === 1) {
      setWrapAllCards(12); // One user, full-width column
    } else if (users.length === 2) {
      setWrapAllCards(6); // Two users, half-width columns
    } else {
      setWrapAllCards(4); // More than two users, quarter-width columns
    }
  }, [users.length]);

  return (
    <>
      <div
        className="container mt-4"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <div className="row justify-content-center">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className={`col-md-${wrapAllCards} col-sm-6 mb-4`}
              >
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body">
                    <img
                      className="rounded-circle mb-3"
                      src={image}
                      alt="Profil"
                      width="100"
                      height="100"
                    />
                    <h5 className="card-title">{user.realName}</h5>
                    <h6 className="text-muted">{user.name}</h6>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.bio}</p>
                    <p className="card-text">
                      Aktiflik:{" "}
                      <span
                        className={user.online ? "text-success" : "text-danger"}
                      >
                        {user.online ? "Çevrimiçi" : "Çevrimdışı"}
                      </span>
                    </p>
                    <p>
                      {user.email === email ? (
                        <span className="badge bg-secondary">Admin</span>
                      ) : (
                        <span className="badge bg-info">Kullanıcı</span>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        deleteUser(user.id, user.email, user.name);
                      }}
                      className="btn btn-danger btn-sm px-4 py-2 fw-bold rounded-pill shadow"
                    >
                      🗑 SİL
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Kullanıcı bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
      {showToast && (
        <Toast message={message} onClose={() => setShowToast(false)} />
      )}
    </>
  );
}
export default AllUsers;
