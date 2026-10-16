import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const VerificationPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const stored = sessionStorage.getItem("verification_contact");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const storedEmail = parsed.email || "";
        const storedPhone = parsed.phone || "";

        // Check if both email and phone are missing
        if (!storedEmail && !storedPhone) {
          // Redirect to the previous page
          router.back();
          return;
        }

        sessionStorage.setItem(
          "verification_details",
          JSON.stringify({ email: false, phone: false })
        );
        setEmail(storedEmail);
        setPhone(storedPhone);
      } catch (e) {
        console.error("Failed to parse verification contact:", e);
        router.back();
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const handleVerificationMethod = (method: "email" | "phone") => {
    sessionStorage.setItem("verification_method", method);

    router.push(`/verify-account/${method}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        backgroundColor: "#F9F7F4",
        position: "relative",
      }}
    >
      {/* Left Logo Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: isMobile ? 10 : 0,
        }}
      >
        <Image
          src="/logo-icon.png"
          alt="Dotsquare Icon"
          width={isMobile ? 180 : 280}
          height={isMobile ? 180 : 280}
        />
      </Box>

      {/* Right Verification Area */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          py: 8,
          px: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#4E4E4E", fontWeight: 400, mb: 1 }}
        >
          Heal Yourself
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#A793C2", mb: 0.5 }}
        >
          Welcome to
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#A5A36B",
            mb: 4,
          }}
        >
          Wellness-Focused
        </Typography>

        <Typography sx={{ mb: 3, color: "#333" }}>
          Verify Your Email & Phone
        </Typography>
        {email && (
          <Typography sx={{ color: "#888", mb: 1 }}>Email: {email}</Typography>
        )}
        {phone && (
          <Typography sx={{ color: "#888", mb: 2 }}>Phone: {phone}</Typography>
        )}

        <Button
          fullWidth
          onClick={() => handleVerificationMethod("phone")}
          sx={buttonStyle}
        >
          Phone Verification
        </Button>
        <Button
          fullWidth
          onClick={() => handleVerificationMethod("email")}
          sx={buttonStyle}
        >
          Email Verification
        </Button>
      </Box>
    </Box>
  );
};

export default VerificationPage;

const buttonStyle = {
  py: 1.6,
  borderRadius: "999px",
  backgroundColor: "#8B4720",
  color: "white",
  fontSize: "1rem",
  fontWeight: 500,
  mb: 2,
  "&:hover": {
    backgroundColor: "#7a3f1d",
  },
};
