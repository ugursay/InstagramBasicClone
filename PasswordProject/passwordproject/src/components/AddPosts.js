import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Toast from "../toast/Toast";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { postSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function AddPosts() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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

  const onSubmit = async (values) => {
    try {
      // setIsLoggedIn(true);
      console.log("Post paylaşıldı");
      await axios.post(`http://localhost:5000/posts/`, {
        userId: id,
        content: values.post,
        createdAt: new Date().toISOString(),
      });
      setMessage("Postunuz Paylaşılmıştır ♥");
      setShowToast(true);
      setTimeout(() => {
        navigate("/userpanel/myposts");
      }, 750);
    } catch (error) {
      // setIsLoggedIn(false);
      console.log("hat meydana geldi", error);
    } finally {
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      post: "",
    },
    validationSchema: postSchema,
    onSubmit,
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <img className="profile-image" src={image} alt="Profil" />
        <h1 className="profile-name">{realName}</h1>
        <p className="profile-bio">{bio}</p>
        <h2 className="login-title">Post Ekleme Sayfam</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <textarea
              type="text"
              id="post"
              value={values.post}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Post girmeye ne dersiniz?"
              className={`input-field ${
                errors.post && touched.post ? "is-invalid" : ""
              }`}
              rows={4}
            />
            {errors.post && touched.post && (
              <div className="invalid-feedback">{errors.post}</div>
            )}
          </div>

          <button disabled={isSubmitting} type="submit" className="login-btn">
            Postu Paylaş
          </button>
          {showToast && (
            <Toast message={message} onClose={() => setShowToast(false)} />
          )}
        </form>
      </div>
    </div>
  );
}
export default AddPosts;
