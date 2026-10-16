import validator from "validator";

export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordErrors {
  email?: string;
}

export const validateForgotPasswordForm = (data: ForgotPasswordForm): ForgotPasswordErrors => {
  const errors: ForgotPasswordErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
