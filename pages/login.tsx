import React, { useState } from "react";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Lock,
} from "@mui/icons-material";
import { useSnackbar } from "@/components/SnackbarProvider";
import {
  LoginForm,
  LoginValidationErrors,
  validateLoginForm,
} from "@/utils/validations/loginValidation";
import { BackendResponse } from "@/types";

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    role: "user",
  });
  const { showMessage } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        user_type: formData.role,
        redirect: false,
      });

      if (result?.error) {
        let errorMessage = result.error;
        let backendResponse: BackendResponse | null = null;

        try {
          const parsedError = JSON.parse(result.error);
          errorMessage = parsedError.message;
          backendResponse = {
            message: parsedError.message,
            status: parsedError.status,
            data: parsedError.data,
            fullResponse: parsedError.fullResponse,
          };
        } catch (e) {
          console.warn("error:", e);
        }

        if (errorMessage.toLowerCase().includes("verify")) {
          showMessage("Please verify your account before logging in", "error");

          if (backendResponse?.data?.email || backendResponse?.data?.phone) {
            sessionStorage.setItem(
              "verification_contact",
              JSON.stringify({
                email: backendResponse.data.email || "",
                phone: backendResponse.data.phone || "",
              })
            );
          }

          router.push("/verification");
          return;
        }

        showMessage(
          errorMessage ||
            "The email or password you entered is incorrect. Please try again.",
          "error"
        );
      } else if (result?.ok) {
        const session = await getSession();

        const userRole = session?.user?.user_type;

        showMessage("Login successful.", "success");

        if (userRole === "practitioner") {
          if (session?.user?.profile_incomplete) {
            router.push("/practitioner/complete-profile");
          } else {
            router.push("/practitioner-dashboard");
          }
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      showMessage(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof LoginForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    };

  const handleSelectChange =
    (field: keyof LoginForm) => (e: SelectChangeEvent<string>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: isMobile ? "100%" : "100vh",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        backgroundColor: "#F5F1ED",
      }}
    >
      {/* Left side - Logo */}
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
          alt="Logo"
          width={isMobile ? 180 : 280}
          height={isMobile ? 180 : 280}
        />
      </Box>

      {/* Right side - Form */}
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#7B7F4D",
              fontWeight: 600,
              mb: 3,
              textAlign: "center",
            }}
          >
            Let’s Get You Logged In!
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            sx={textFieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={visible ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            sx={textFieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisible(!visible)} edge="end">
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={formData.role}
              onChange={handleSelectChange("role")}
              label="Account Type"
              sx={{
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#A0634C",
                },
              }}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: 1 }}>
                  <Person sx={{ color: "#A0634C" }} />
                </InputAdornment>
              }
            >
              <MenuItem value="user">User Account</MenuItem>
              <MenuItem value="practitioner">Practitioner Account</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.6,
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "10px",
              backgroundColor: "#8B4720",
              color: "white",
              "&:hover": {
                backgroundColor: "#7a3f1d",
              },
              "&:disabled": {
                backgroundColor: "#cccccc",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#333", mb: 1 }}>
              <Link
                component="button"
                type="button"
                onClick={() => router.push("/forgot-password")}
                sx={{
                  color: "#8B4720",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: "#333" }}>
              {"Don't have an account? "}
              <Link
                component="button"
                type="button"
                onClick={() => router.push("/role-selection")}
                sx={{
                  color: "#8B4720",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

const textFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#A0634C",
    },
    "&.Mui-error fieldset": {
      borderColor: "#d32f2f",
    },
  },
  "& label": {
    color: "#000",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiFormHelperText-root": {
    ml: 0,
    mt: 0.5,
  },
};
