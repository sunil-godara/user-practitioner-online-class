interface ProfileFormValues {
  fullName: string;
  zipCode: string;
}

export const zipRegex = /^\d{5}(-\d{4})?$/;

export const validateProfileForm = (values: ProfileFormValues) => {
  const errors: Partial<ProfileFormValues> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Name is required";
  } else if (values.fullName.length < 2) {
    errors.fullName = "Name must be at least 2 characters long";
  }

  if (!values.zipCode.trim()) {
    errors.zipCode = "Zip code is required";
  } else if (!zipRegex.test(values.zipCode)) {
    errors.zipCode = "Zip code is invalid";
  }

  return errors;
};
