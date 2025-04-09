import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/SignUp.css";
import { useFormik } from "formik";
import axios from "axios";
import { signUpSchema } from "../schemas";
import Toast from "../toast/Toast";
import { Link } from "react-router-dom";

function SignUp() {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      const userExist = response.data.some(
        (user) => user.email === values.email || user.name === values.name
      );

      if (userExist) {
        setMessage("Bu Mail adresi ya da kullanıcı adı zaten kullanımda");
        setShowToast(true);
        actions.resetForm();
      } else {
        await axios.post(`http://localhost:5000/users`, values);
        setMessage("Kaydolma Başarılı");
        setShowToast(true);
        actions.resetForm();
      }
    } catch (error) {
      setMessage("Kaydolma Başarısız: ", error);
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
      email: "",
      name: "",
      password: "",
    },
    validationSchema: signUpSchema,
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
              placeholder="Mail adresiniz ile kayıt olunuz"
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
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Kullanıcı adı oluşturunuz"
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
            Kayıt Ol
          </button>
          {showToast &&
            (console.log("m", message, showToast),
            (<Toast message={message} onClose={() => setShowToast(false)} />))}
          <div className="text-center mt-3">
            <p className="text-muted">Zaten Üyeyim</p>
            <Link to="/" className="btn btn-outline-primary btn-sm">
              Üye girişi
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
