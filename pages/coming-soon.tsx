import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormData } from "@/types";

const ComingSoonScreen: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    zipCode: "",
    agreeToUpdates: false,
  });

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "agreeToUpdates"
            ? event.target.checked
            : event.target.value,
      }));
    };

  const handleSubmit = () => {
    // Navigate to next step
    router.push("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: isMobile ? "calc(100vh - 120px)" : "calc(100vh - 160px)",
          px: { xs: 3, md: 4 },
          py: 4,
        }}
      >
        {/* Coming Soon Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              mb: 3,
            }}
          >
            Coming soon...
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              fontWeight: 400,
              mb: 1,
              lineHeight: 1.3,
            }}
          >
            A new way to heal is on the way.
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              fontWeight: 400,
              mb: 4,
            }}
          >
            Be part of the shift.
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box sx={{ width: "100%", maxWidth: 400, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                "& fieldset": {
                  borderColor: "#A0634C",
                },
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                "& fieldset": {
                  borderColor: "#A0634C",
                },
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                "& fieldset": {
                  borderColor: "#A0634C",
                },
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange("zipCode")}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                "& fieldset": {
                  borderColor: "#A0634C",
                },
              },
            }}
          />

          {/* Checkbox */}
          <Box
            sx={{
              border: "1px solid #A0634C",
              borderRadius: 4,
              p: 2,
              mb: 4,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToUpdates}
                  onChange={handleInputChange("agreeToUpdates")}
                  sx={{
                    color: "#A0634C",
                    "&.Mui-checked": {
                      color: "#A0634C",
                    },
                  }}
                />
              }
              label="I agree to email + text updates from Dotsquare"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.95rem",
                  color: "text.primary",
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
            }}
            onClick={handleSubmit}
          >
            Join The Movement
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ComingSoonScreen;
