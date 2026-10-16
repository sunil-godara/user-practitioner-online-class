import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { Logo } from "./index";

const RoleSelectionScreen: React.FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h2"
        sx={{
          color: "text.primary", // Dark color for main heading
          fontWeight: 600,
        }}
      >
        Welcome to
      </Typography>

      <Box sx={{ maxWidth: 200, mx: "auto", mb: 1 }}>
        <Logo size={180} />
      </Box>

      <Typography
        variant="h3"
        sx={{
          color: "secondary.main", // Brand color for emphasis
          fontWeight: 700,
          mb: 1,
        }}
      >
        Wellness-Focused
      </Typography>

      <Typography
        variant="subtitle1" // Changed from body1 to subtitle1 for better hierarchy
        sx={{
          mb: 3,
          px: { xs: 2, md: 0 },
          fontSize: { xs: "1rem", md: "1.125rem" }, // Slightly larger on desktop
          lineHeight: 1.6,
        }}
      >
        Choose your role to get started on your journey.
      </Typography>

      {/* Role Selection Buttons */}
      <Box sx={{ width: "100%", maxWidth: 360, mx: "auto" }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            mb: 2,
            py: 2,
            fontSize: "1rem",
            fontWeight: 600,
            color: "secondary.main", // Ensures color matches theme
            borderColor: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.light",
              borderColor: "secondary.dark",
              color: "secondary.contrastText",
            },
          }}
          onClick={() => router.push("/create-account/user")}
        >
          As a User
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            py: 2,
            fontSize: "1rem",
            fontWeight: 600,
            color: "secondary.contrastText", // Ensures text is readable on secondary bg
            "&:hover": {
              backgroundColor: "secondary.dark",
              color: "secondary.contrastText",
            },
          }}
          onClick={() => router.push("/create-account/practitioner")}
        >
          As a Practitioner
        </Button>
      </Box>
    </Box>
  );
};

export default RoleSelectionScreen;
