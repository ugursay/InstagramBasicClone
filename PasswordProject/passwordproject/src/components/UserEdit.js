import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/SignUp.css";
import { useFormik } from "formik";
import axios from "axios";
import { profileEditSchema } from "../schemas";
import Toast from "../toast/Toast";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

function UserEdit() {
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
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const onSubmit = async (values, actions) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        email: "",
        realName: "",
        name: "",
        bio: "",
        password: "",
      });
      const response = await axios.get(`http://localhost:5000/users`);
      const userExist = response.data.some(
        (user) => user.email === values.email || user.name === values.name
      );

      if (userExist) {
        setMessage("Bu Mail adresi ya da kullanıcı adı zaten kullanımda");
        setShowToast(true);
        actions.resetForm();
      } else {
        await axios.patch(`http://localhost:5000/users/${id}`, {
          email: values.email,
          realName: values.realName,
          name: values.name,
          bio: values.bio,
          password: values.password,
        });

        setEmail(values.email);
        setRealName(values.realName);
        setName(values.name);
        setBio(values.bio);
        setPassword(values.password);
        setOnline(true);

        setMessage("Düzenleme Başarılı");
        setShowToast(true);

        actions.resetForm();

        setTimeout(() => {
          navigate(-1);
        }, 750);
      }
    } catch (error) {
      setMessage("Düzenleme Başarısız: ", error);
      setShowToast(true);
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
      email: email || "",
      realName: realName || "",
      bio: bio || "",
      name: name || "",
      password: password || "",
    },
    enableReinitialize: true,
    validationSchema: profileEditSchema,
    onSubmit,
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Instagram</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Yeni Mail adresinizi giriniz"
              className={`input-field ${
                errors.email && touched.email ? "is-invalid" : ""
              }`}
            />
            {errors.email && touched.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              id="realName"
              value={values.realName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Yeni isim ve isteğe bağlı soy isminizi giriniz"
              className={`input-field ${
                errors.realName && touched.realName ? "is-invalid" : ""
              }`}
            />
            {errors.realName && touched.realName && (
              <div className="invalid-feedback">{errors.realName}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Yeni Kullanıcı adı oluşturunuz"
              className={`input-field ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
            />
            {errors.name && touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              id="bio"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Yeni Biografinizi oluşturunuz"
              className={`input-field ${
                errors.bio && touched.bio ? "is-invalid" : ""
              }`}
            />
            {errors.bio && touched.bio && (
              <div className="invalid-feedback">{errors.bio}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Yeni Şifrenizi giriniz"
              className={`input-field ${
                errors.password && touched.password ? "is-invalid" : ""
              }`}
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button disabled={isSubmitting} type="submit" className="login-btn">
            Düzenlemeyi Kaydet
          </button>
          {showToast && (
            <Toast message={message} onClose={() => setShowToast(false)} />
          )}
          <div className="text-center mt-3">
            <p className="text-muted">ya da</p>
            <Link
              onClick={() => navigate(-1)}
              className="btn btn-outline-primary btn-sm"
            >
              İptal Et
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;
