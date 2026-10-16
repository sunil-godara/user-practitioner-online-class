import React from "react";
import { useRouter } from "next/router";
import { Container, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 96, color: "success.main", mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your booking is confirmed. Check your email for details.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2, fontWeight: 600 }}
          onClick={() => router.push("/bookings")}
        >
          Go to My Bookings
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;