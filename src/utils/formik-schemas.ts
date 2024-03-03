import * as Yup from "yup";

const email = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

const password = Yup.string().required("Password is required");

export const SignInSchema = Yup.object().shape({
  email,
  password,
});

export const SignUpSchema = Yup.object().shape({
  email,
  password: password
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  confirmation_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirmation Password is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
});
