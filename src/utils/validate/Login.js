import * as Yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
export const emailSchema = Yup.string()
  .required("Email is required")
  .matches(emailRegex, "Invalid email format");

export const passwordSchema = Yup.string()
  .required("Password is required")
  .matches(
    passwordRegex,
    "Password must contain at least one uppercase letter and one number"
  )
  .min(6, "Password must be at least 6 characters long");
