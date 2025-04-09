import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz!")
    .required("Kayıt olurken Email girmek zorunludur."),
  name: yup
    .string()
    .min(2, "Kullanıcı adı en az 2 karakter olabilir")
    .max(30, "Kullanıcı adı en fazla 30 karakter olabilir")
    .required("Kullanıcı adı girmek zorunludur"),
  password: yup
    .string()
    .min(5, "Lütfen minimum 5 karakter giriniz!")
    .matches(passwordRules, {
      message: "Lütfen en az 1 büyük harf, 1 küçük harf ve 1 sayı giriniz",
    })
    .required("Kayıt olurken Şifre girmek zorunludur."),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz!")
    .required("Giriş yaparken Email girmek zorunludur."),
  password: yup
    .string()
    .min(5, "Lütfen minimum 5 karakter giriniz!")
    .matches(passwordRules, {
      message: "Lütfen en az 1 büyük harf, 1 küçük harf ve 1 sayı giriniz",
    })
    .required("Giriş yaparken Şifre girmek zorunludur."),
});
