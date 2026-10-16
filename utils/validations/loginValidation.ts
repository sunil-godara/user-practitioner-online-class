import validator from "validator";

export interface LoginForm {
  email: string;
  password: string;
  role?: string;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const validateLoginForm = (data: LoginForm): LoginValidationErrors => {
  const errors: LoginValidationErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (!strongPasswordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character";
  }

  return errors;
};
