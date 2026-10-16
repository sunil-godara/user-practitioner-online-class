import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerificationCode from "@/components/VerificationCode";
import { useSnackbar } from "@/components/SnackbarProvider";
import { verifyEmail } from "@/utils/api/verifyEmail";
import { resendEmailVerification } from "@/utils/api/resendEmailVerification";
import { verifyPhone } from "@/utils/api/verifyPhone";

const VerifyCodePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { showMessage } = useSnackbar();

  const { type } = router.query as { type?: "email" | "phone" };
  const [contact, setContact] = useState<string>("");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");

  useEffect(() => {
    const stored = sessionStorage.getItem("verification_contact");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (type === "email") {
          setContact(parsed.email || "");
        } else if (type === "phone") {
          setContact(parsed.phone || "");
        }
      } catch (e) {
        console.error("Invalid verification contact data", e);
      }
    } else {
      showMessage("No contact found in session", "error");
      router.push("/");
    }
  }, [type, router, showMessage]);

  const handleResendOTP = async () => {
    const stored = sessionStorage.getItem("verification_contact");
    if (!stored) {
      showMessage("No data found", "error");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const email = parsed.email;
      if (!email) {
        showMessage("Email is missing", "error");
        return;
      }

      const { ok, data } = await resendEmailVerification({ email });
      if (ok) {
        showMessage(data.message || "Verification email resent", "success");
      } else {
        showMessage(
          data.message || "Failed to resend verification email",
          "error"
        );
      }
    } catch (e) {
      console.error("Error during login or session handling:", e);
      showMessage(
        "An unexpected error occurred during login. Please try again.",
        "error"
      );
    }
  };

  const handleSubmit = async () => {
    const fullOTP = code.join("");
    if (fullOTP.length !== 6) {
      showMessage("Enter full 6-digit code", "error");
      return;
    }

    const stored = sessionStorage.getItem("verification_contact");
    if (!stored) {
      showMessage("No contact found in session", "error");
      return;
    }

    const parsed = JSON.parse(stored);
    const email = parsed?.email;
    const phone = parsed?.phone;

    if (type === "email" && !email) {
      showMessage("Email is missing", "error");
      return;
    }

    if (type === "phone" && !phone) {
      showMessage("Phone number is missing", "error");
      return;
    }

    setLoading(true);
    let response;

    if (type === "email") {
      response = await verifyEmail({ email, otp: fullOTP });
    } else if (type === "phone") {
      response = await verifyPhone({ phone, otp: fullOTP });
    }
    setLoading(false);

    if (response?.ok) {
      showMessage(
        response.data?.message ||
          `${type === "email" ? "Email" : "Phone"} verified successfully`,
        "success"
      );

      const detailsRaw = sessionStorage.getItem("verification_details");
      const details = detailsRaw
        ? JSON.parse(detailsRaw)
        : { email: false, phone: false };
      details[type!] = true;
      sessionStorage.setItem("verification_details", JSON.stringify(details));

      // Set dialog message based on verification status
      if (type === "email" && !details.phone) {
        setDialogMessage("Email verified! Next, verify your phone number.");
      } else if (type === "phone" && !details.email) {
        setDialogMessage("Phone number verified! Next, verify your email.");
      } else {
        setDialogMessage(
          "All verifications complete! Redirecting to dashboard."
        );
      }

      setShowDialog(true);

      setTimeout(() => {
        if (type === "email" && !details.phone) {
          router.push("/verify-account/phone");
        } else if (type === "phone" && !details.email) {
          router.push("/verify-account/email");
        } else {
          router.push("/dashboard");
        }
      }, 5000);
    } else {
      showMessage(response?.data?.message || "Failed to verify", "error");
    }
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
      {/* Left Side */}
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

      {/* Right Side */}
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
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#A5A36B",
            mb: 2,
          }}
        >
          Enter The Verification Code
        </Typography>

        <Typography sx={{ color: "#333", mb: 3 }}>
          6-digit OTP sent to {type} {contact}
        </Typography>

        <VerificationCode label="" value={code} onChange={setCode} length={6} />

        <Button
          onClick={handleSubmit}
          fullWidth
          sx={{
            mt: 2,
            py: 1.6,
            borderRadius: "999px",
            backgroundColor: "#8B4720",
            color: "white",
            fontSize: "1rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#7a3f1d",
            },
          }}
        >
          {loading ? "Verifying..." : "Submit"}
        </Button>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "#A0634C",
            cursor: "pointer",
            fontWeight: 500,
            textDecoration: "underline",
            "&:hover": { color: "#8F5A45" },
          }}
          onClick={handleResendOTP}
        >
          Resend OTP
        </Typography>
      </Box>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            textAlign: "center",
            py: 6,
            px: 4,
            minHeight: 240,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#4CAF50" }} />
          <Typography variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
            Verification Successful!
          </Typography>
          <Typography sx={{ mt: 2, color: "#555", fontSize: "1.1rem" }}>
            {dialogMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VerifyCodePage;
