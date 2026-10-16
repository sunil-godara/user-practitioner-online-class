import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Checkbox,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Business,
  Email,
  Phone,
  LocationOn,
  Lock,
} from "@mui/icons-material";
import { useSnackbar } from "@/components/SnackbarProvider";
import {
  RegisterErrors,
  validateRegisterForm,
} from "@/utils/validations/registerValidation";
import { registerUser } from "@/utils/api/register";

const CreateAccountPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { showMessage } = useSnackbar();
  const { role } = router.query;
  const isPractitioner = role === "practitioner";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    zipCode: "",
    password: "",
    companyName: "",
    accepted_terms: false,
    accepted_privacy_policy: false,
    accepted_waiver_agreement: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isCheckbox = e.target.type === "checkbox";
      const value = isCheckbox ? e.target.checked : e.target.value;

      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (errors[key]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const { ok, data } = await registerUser({
        name: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        zipCode: form.zipCode,
        accepted_terms: form.accepted_terms,
        accepted_privacy_policy: form.accepted_privacy_policy,
        accepted_waiver_agreement: form.accepted_waiver_agreement,
        user_type: isPractitioner ? "practitioner" : "user",
        ...(isPractitioner && { company_name: form.companyName }),
      });

      if (ok && data?.status) {
        showMessage(data.message || "Account created successfully!", "success");
        sessionStorage.setItem(
          "verification_contact",
          JSON.stringify({
            email: form.email,
            phone: form.phone,
          })
        );
        router.push("/verification");
      } else {
        showMessage(data?.message || "Registration failed", "error");
        sessionStorage.setItem(
          "verification_contact",
          JSON.stringify({
            email: form.email,
            phone: form.phone,
          })
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      showMessage("An unexpected error occurred during registration", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role !== "user" && role !== "practitioner") {
      router.replace("/role-selection");
    }
  }, [role, router]);

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
      {/* Left side - Icon */}
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
        {/* Form Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: "#7B7F4D", fontWeight: 600, mb: 1 }}
          >
            Welcome Aboard!
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#333" }}>
            {"We're excited to have you join us"}
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
        >
          <TextField
            helperText={errors.fullName}
            fullWidth
            label="Full Name"
            type="text"
            value={form.fullName}
            onChange={handleChange("fullName")}
            sx={textFieldStyle}
            error={!!errors.fullName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
            }}
          />

          {isPractitioner && (
            <TextField
              helperText={errors.companyName}
              fullWidth
              label="Company Name"
              type="text"
              value={form.companyName}
              onChange={handleChange("companyName")}
              sx={textFieldStyle}
              error={!!errors.companyName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business sx={{ color: "#A0634C" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <TextField
            helperText={errors.email}
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            sx={textFieldStyle}
            error={!!errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            helperText={errors.phone}
            fullWidth
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            sx={textFieldStyle}
            error={!!errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
              inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
                minLength: 10,
              },
            }}
          />

          <TextField
            helperText={errors.zipCode}
            fullWidth
            label="Zip Code"
            type="text"
            value={form.zipCode}
            onChange={handleChange("zipCode")}
            sx={textFieldStyle}
            error={!!errors.zipCode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
              inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 6,
                minLength: 4,
              },
            }}
          />

          <TextField
            helperText={errors.password}
            fullWidth
            label="Create Password"
            type={visible ? "text" : "password"}
            value={form.password}
            onChange={handleChange("password")}
            sx={textFieldStyle}
            error={!!errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#A0634C" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {visible ? (
                    <Visibility
                      onClick={() => setVisible(!visible)}
                      style={{ cursor: "pointer", color: "#A0634C" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => setVisible(!visible)}
                      style={{ cursor: "pointer", color: "#A0634C" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{
              autoComplete: "new-password",
            }}
          />

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                p: 1.2,
                px: 2,
                border: "1px solid #A0634C",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Checkbox
                checked={form.accepted_terms}
                onChange={handleChange("accepted_terms")}
                sx={{ p: 0.5, color: "#A0634C" }}
              />
              <Typography sx={{ ml: 1, fontSize: 14 }}>
                I accept Legal terms and conditions
              </Typography>
            </Box>
            {errors.accepted_terms && (
              <FormHelperText error>{errors.accepted_terms}</FormHelperText>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                p: 1.2,
                px: 2,
                border: "1px solid #A0634C",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Checkbox
                checked={form.accepted_privacy_policy}
                onChange={handleChange("accepted_privacy_policy")}
                sx={{ p: 0.5, color: "#A0634C" }}
              />
              <Typography sx={{ ml: 1, fontSize: 14 }}>
                I accept Privacy policy
              </Typography>
            </Box>
            {errors.accepted_privacy_policy && (
              <FormHelperText error>
                {errors.accepted_privacy_policy}
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                p: 1.2,
                px: 2,
                border: "1px solid #A0634C",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Checkbox
                checked={form.accepted_waiver_agreement}
                onChange={handleChange("accepted_waiver_agreement")}
                sx={{ p: 0.5, color: "#A0634C" }}
              />
              <Typography sx={{ ml: 1, fontSize: 14 }}>
                I accept Waiver agreement
              </Typography>
            </Box>
            {errors.accepted_waiver_agreement && (
              <FormHelperText error>
                {errors.accepted_waiver_agreement}
              </FormHelperText>
            )}
          </Box>

          {/* Submit Button */}
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
              "Submit"
            )}
          </Button>
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#333" }}>
            {"Already have an account? "}
            <Link
              component="button"
              type="button"
              onClick={() => router.push("/login")}
              sx={{
                color: "#8B4720",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccountPage;

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
