import * as Yup from "yup";

const email = Yup.string()
  .email("Invalid email address.")
  .required("Required field");

const password = Yup.string().required("Required field");

export const SignInSchema = Yup.object().shape({
  email,
  password,
});

export const SignUpSchema = Yup.object().shape({
  email,
  password: password
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter."),
  confirmation_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required field"),
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
});
