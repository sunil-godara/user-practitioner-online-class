import React from "react";
import { Box, Container } from "@mui/material";
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 3, md: 4 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        ></Box>

        <Box
          sx={{
            width: "100%",
            minHeight: 500,
            maxWidth: 800,
            backgroundColor: "background.paper",
            borderRadius: { xs: 1, md: 1 },
            p: { xs: 3, md: 4 },
            boxShadow: { xs: 1, md: 2 },
          }}
        >
          {children}
        </Box>

        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        ></Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
