export interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

export interface ResetPasswordErrors {
  password?: string;
  confirm_password?: string;
}

const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;

export const validateResetPasswordForm = (
  data: ResetPasswordForm
): ResetPasswordErrors => {
  const errors: ResetPasswordErrors = {};

  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (!strongPasswordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character";
  }

  if (!data.confirm_password.trim()) {
    errors.confirm_password = "Confirm password is required";
  } else if (data.password !== data.confirm_password) {
    errors.confirm_password = "Passwords do not match";
  }

  return errors;
};
