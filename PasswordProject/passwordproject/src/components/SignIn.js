import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/SignUp.css";
import { useFormik } from "formik";
import axios from "axios";
import { signInSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function SignIn() {
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
    isAdmin,
    setIsAdmin,
  } = useUser();

  const onSubmit = async (values) => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      const user = response.data.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (
        values.email === "ugursay3211@gmail.com" &&
        values.password === "12345Nn"
      ) {
        setId(user.id);
        setEmail(user.email);
        setRealName(user.realName);
        setName(user.name);
        setBio(user.bio);
        setImage(user.bio);
        setPassword(user.password);
        setOnline(true);
        setIsAdmin(true);
        navigate(`/userpanel/adminprofileedit`);
      } else if (user) {
        // setIsLoggedIn(true);
        setId(user.id);
        setEmail(user.email);
        setRealName(user.realName);
        setName(user.name);
        setBio(user.bio);
        setImage(user.bio);
        setPassword(user.password);
        setIsAdmin(false);
        setOnline(true);

        navigate(`/userpanel/profile`);
      } else {
        // setIsLoggedIn(false);
        setOnline(true);
        navigate(`/`);
        console.log("Geçersiz eposta ya da şifre");
      }
    } catch (error) {
      // setIsLoggedIn(false);
      console.log("hata", error);
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
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
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
              placeholder="Mail adresinizi giriniz"
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
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Şifrenizi giriniz"
              className={`input-field ${
                errors.password && touched.password ? "is-invalid" : ""
              }`}
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button disabled={isSubmitting} type="submit" className="login-btn">
            Giriş Yap
          </button>
          <div className="text-center mt-3">
            <p className="text-muted">Üye Değilim</p>
            <Link to="/signup" className="btn btn-outline-primary btn-sm">
              Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
