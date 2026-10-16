export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const validateChangePasswordForm = (
  data: ChangePasswordForm
): ChangePasswordValidationErrors => {
  const errors: ChangePasswordValidationErrors = {};

  if (!data.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  }

  if (!data.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (!strongPasswordRegex.test(data.newPassword)) {
    errors.newPassword =
      "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character";
  }

  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm new password";
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
