import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "../components/SnackbarProvider";
import { forgotPassword } from "../utils/api/forgot-password";
import {
  ForgotPasswordForm,
  ForgotPasswordErrors,
  validateForgotPasswordForm,
} from "../utils/validations/forgotPasswordValidation";

const ForgotPassword: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { showMessage } = useSnackbar();

  const [form, setForm] = useState<ForgotPasswordForm>({
    email: "",
  });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange =
    (key: keyof ForgotPasswordForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (errors[key]) {
        setErrors((prev) => ({
          ...prev,
          [key]: undefined,
        }));
      }
    };

  const handleSubmit = async () => {
    const validationErrors = validateForgotPasswordForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword({ email: form.email });

      if (response && response.ok) {
        showMessage(response.data.message, "success");
        setForm({ email: "" });
      } else {
        showMessage(
          response.data.message || "Failed to send reset link.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      showMessage("Something went wrong, please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        backgroundColor: "#F5F1ED",
        position: "relative",
      }}
    >
      {/* Left Logo */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: isMobile ? 10 : 0,
          backgroundColor: "#F9F7F4",
        }}
      >
        <Image
          src="/logo-icon.png"
          alt="Dotsquare Symbol"
          width={isMobile ? 180 : 280}
          height={isMobile ? 180 : 280}
        />
      </Box>

      {/* Form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          py: 8,
          px: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: isMobile ? "auto" : "100vh",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: "#7B7F4D", fontWeight: 600, mb: 1 }}
          >
            Forgot Your Password?
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#333" }}>
            Enter your email address, and we’ll send you a link to reset your
            password.
          </Typography>
        </Box>

        <Box component="form" sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            helperText={errors.email}
            error={!!errors.email}
            sx={textFieldStyle}
          />

          <Button
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{
              mt: 3,
              py: 1.6,
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "30px",
              backgroundColor: "#8B4720",
              color: "white",
              "&:hover": {
                backgroundColor: "#7a3f1d",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

const textFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#A0634C",
    },
  },
};
