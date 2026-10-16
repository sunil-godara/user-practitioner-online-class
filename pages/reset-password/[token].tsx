import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { useSnackbar } from "@/components/SnackbarProvider";
import { resetPassword, verifyResetToken } from "@/utils/api/forgot-password";
import { validateResetPasswordForm } from "@/utils/validations/resetPasswordValidation";

type Inputs = {
  password: string;
  confirm_password: string;
};

type Errors = {
  password?: string;
  confirm_password?: string;
};

type Visible = {
  password: boolean;
  confirm_password: boolean;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query as { token?: string };
  const { showMessage } = useSnackbar();

  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(true);
  const [inputs, setInputs] = useState<Inputs>({
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [visible, setVisible] = useState<Visible>({
    password: false,
    confirm_password: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await verifyResetToken({ token });
          if (response?.ok && response?.data?.data.email) {
            setEmail(response.data.data.email);
          } else {
            console.warn("Verification failed:", response);
            showMessage(
              response?.data?.message || "Invalid or expired reset link.",
              "error"
            );
            router.push("/forgot-password");
          }
        } catch (error) {
          console.error(error);
          showMessage("Token verification failed.", "error");
          router.push("/forgot-password");
        } finally {
          setVerifying(false);
        }
      })();
    }
  }, [token, router, showMessage]);

  const handleChange =
    (field: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputs((prev) => ({ ...prev, [field]: value }));

      const newErrors = validateResetPasswordForm({
        ...inputs,
        [field]: value,
      });
      setErrors(newErrors);
    };

  const toggleVisibility = (field: keyof Visible) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateResetPasswordForm(inputs);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0 || !email) return;

    setLoading(true);
    try {
      const response = await resetPassword({
        email,
        password: inputs.password,
        confirm_password: inputs.confirm_password,
      });

      showMessage(response.data.message, response.ok ? "success" : "error");

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Submit error:", error);
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#F5F1ED",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 10, md: 0 },
          backgroundColor: "#F9F7F4",
        }}
      >
        <Image
          src="/logo-icon.png"
          alt="Dotsquare Symbol"
          width={280}
          height={280}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          py: 8,
          px: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: "#7B7F4D", fontWeight: 600, mb: 1 }}
          >
            Reset Your Password
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#333" }}>
            Enter your new password below.
          </Typography>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
          <TextField
            fullWidth
            label="Password"
            type={visible.password ? "text" : "password"}
            value={inputs.password}
            onChange={handleChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleVisibility("password")}>
                    {visible.password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={visible.confirm_password ? "text" : "password"}
            value={inputs.confirm_password}
            onChange={handleChange("confirm_password")}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleVisibility("confirm_password")}
                  >
                    {visible.confirm_password ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
