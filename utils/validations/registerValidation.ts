export interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  password: string;
  companyName: string;
  accepted_terms: boolean;
  accepted_privacy_policy: boolean;
  accepted_waiver_agreement: boolean;
}

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRegex = /^(\+?\d{7,15})$/;
const zipRegex = /^\d{4,10}$/;
const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export function validateRegisterForm(values: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Name is required";
  } else if (values.fullName.length < 2) {
    errors.fullName = "Name must be at least 2 characters long";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!phoneRegex.test(values.phone)) {
    errors.phone = "Phone is invalid";
  }

  if (!values.zipCode.trim()) {
    errors.zipCode = "Zip code is required";
  } else if (!zipRegex.test(values.zipCode)) {
    errors.zipCode = "Zip code is invalid";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (!strongPasswordRegex.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character";
  }

  if (!values.accepted_terms) {
    errors.accepted_terms = "You must accept the Terms & Conditions";
  }
  if (!values.accepted_privacy_policy) {
    errors.accepted_privacy_policy = "You must accept the Privacy Policy";
  }
  if (!values.accepted_waiver_agreement) {
    errors.accepted_waiver_agreement = "You must accept the Waiver Agreement";
  }

  return errors;
}