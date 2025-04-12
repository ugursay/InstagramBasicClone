import React, { use, useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Toast from "../toast/Toast";

function MyPosts() {
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

  const [myPosts, setMyPosts] = useState([]);
  const [postInput, setPostInput] = useState("");
  const [postNotActive, setPostNotActive] = useState(true);

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoggedIn(true);
        console.log("Bütün postlar");
        const response = await axios.get(`http://localhost:5000/posts`);
        const filteredMyPosts = response.data.filter(
          (user) => user.userId === id
        );

        setMyPosts(filteredMyPosts);
      } catch (error) {
        // setIsLoggedIn(false);
        console.log("hata meydana geldi", error);
      }
    };

    fetchData();
  }, [id]);

  const deletePost = async (deleteId) => {
    try {
      // setIsLoggedIn(true);
      console.log("Silindi", deleteId);
      await axios.delete(`http://localhost:5000/posts/${deleteId}`);

      setMyPosts((prev) => prev.filter((post) => post.id !== deleteId));
    } catch (error) {
      // setIsLoggedIn(false);
      console.log("hata meydana geldi", error);
    }
  };

  const updatePost = async (updateId, updateContent, updateCreatedAt) => {
    if (updateContent?.trim()) {
      try {
        // setIsLoggedIn(true);
        setMessage("Postunuz Güncellendi 🖊");
        setShowToast(true);
        console.log("Güncellendi", updateId);
        await axios.patch(`http://localhost:5000/posts/${updateId}`, {
          content: updateContent,
          createdAt: updateCreatedAt,
        });

        setMyPosts((prevdatas) =>
          prevdatas.map((prev) =>
            prev.id === updateId
              ? { ...prev, content: updateContent, createdAt: updateCreatedAt }
              : prev
          )
        );
        setPostNotActive(true);
        // setMyPosts((prev) => prev.patch((post) => post.id !== deleteId));
      } catch (error) {
        // setIsLoggedIn(false);
        console.log("hata meydana geldi", error);
      }
    } else {
      setMessage("Lütfen yazı yazınız");
      setShowToast(true);
    }
  };

  const handleChange = (event) => {
    setPostInput(event.target.value);
  };

  return (
    <div
      className="login-container d-flex justify-content-center"
      style={{ width: "600px", margin: "auto" }}
    >
      <div className="login-card mb-1 sticky-top bg-white">
        <div className="text-center mb-3">
          <img
            src={image}
            alt="Profil"
            className="rounded-circle mb-2"
            width="120"
            height="120"
          />
          <h1 className="h4">{realName}</h1>
          <p className="text-muted">{bio}</p>
          <h2 className="h5 mt-3">Postlarım</h2>
        </div>

        <div
          className="container"
          style={{ maxHeight: "50vh", overflowY: "auto" }}
        >
          {myPosts.length > 0 ? (
            myPosts.map((post) => (
              <div
                key={post.id}
                className="login-card mb-4 p-4 shadow-sm"
                style={{
                  maxWidth: "500px",
                  margin: "auto",
                  border: "1px solid #ddd", // Uyumluluk için daha yumuşak bir kenarlık
                  borderRadius: "8px", // Kenarlarda yumuşak geçiş
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Hafif gölge
                }}
              >
                <p className="profile-bio" style={{ margin: "10px" }}>
                  <textarea
                    value={postNotActive ? post.content : postInput[post.id]}
                    onChange={handleChange}
                    className="profile-bio"
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      borderRadius: "8px", // İç kenarlıkların yuvarlatılması
                    }}
                    rows={3}
                  />
                </p>
                <div className="login-card d-flex justify-content-start mt-4">
                  <button
                    onClick={() => {
                      deletePost(post.id);
                      setMessage("Postunuz Silindi 🖊");
                      setShowToast(true);
                    }}
                    className="btn btn-danger btn-sm me-4"
                    style={{ flex: "0 0 auto" }}
                  >
                    Sil
                  </button>
                  <button
                    onClick={() => {
                      postNotActive
                        ? updatePost(post.id, post.content, post.createdAt)
                        : updatePost(post.id, postInput, post.createdAt);
                    }}
                    className="btn btn-primary btn-sm me-4"
                    style={{ flex: "0 0 auto" }}
                  >
                    Güncelle
                  </button>

                  <button
                    onClick={() => {
                      setPostNotActive(false);
                      setMessage("Postunuzu Düzenleyebilirsiniz 🖊");
                      setShowToast(true);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: "0 0 auto" }}
                  >
                    Düzenle
                  </button>

                  {showToast && (
                    <Toast
                      message={message}
                      onClose={() => setShowToast(false)}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">
              Henüz hiç paylaşım yapmadınız
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyPosts;
