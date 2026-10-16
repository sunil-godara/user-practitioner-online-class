import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { PlaceholderPageProps } from "@/types";

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

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
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            mb: 3,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.primary",
            mb: 4,
            maxWidth: 400,
          }}
        >
          {
            "This page is coming soon. We're working on bringing you the best wellness experience."
          }
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/")}
          sx={{
            py: 1.5,
            px: 4,
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default PlaceholderPage;
