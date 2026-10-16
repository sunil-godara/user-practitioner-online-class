import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/legacy/image";

// A reusable component for the Dotsquare logo
export const Logo: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <Box
    component="span"
    sx={{
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      flexShrink: 0,
    }}
  >
    <Image
      src="/logo-icon.png"
      alt="Dotsquare Logo"
      layout="fill"
      objectFit="contain"
      priority
    />
  </Box>
);

const WelcomeScreen: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffffff",
        display: "flex",
        flexDirection: "column",
        color: "#2C2C2C",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, md: 0 },
          py: { xs: 4, md: 0 },
        }}
      >
        {isMobile ? (
          // Mobile Layout (Vertical)
          <Box
            component="span"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 400,
              width: "100%",
            }}
          >
            {/* Large Logo */}
            <Box sx={{ mb: 6 }}>
              <Logo size={160} />
            </Box>

            {/* Text Content */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 400,
                  mb: 2,
                  fontSize: "2.5rem",
                  lineHeight: 1.2,
                }}
              >
                Welcome to Dotsquare
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 300,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                Sign in to access your{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#8FA67C",
                    fontWeight: 400,
                    fontSize: "inherit",
                  }}
                >
                  personalized wellness dashboard
                </Typography>{" "}
                and continue your health journey.
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ width: "100%", mb: 5 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#A0634C",
                  color: "white",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: 25,
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "#8F5A45",
                  },
                }}
                onClick={() => router.push("/role-selection")}
              >
                Create Account
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#A0634C",
                  color: "#A0634C",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: 25,
                  "&:hover": {
                    borderColor: "#8F5A45",
                    color: "#8F5A45",
                  },
                }}
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            </Box>

            {/* Social Login Section */}
            <Box sx={{ width: "100%" }}>
              <Divider sx={{ mb: 4 }}>
                <Typography variant="body2" sx={{ color: "#2C2C2C", px: 2 }}>
                  Or sign in with
                </Typography>
              </Divider>

              {/* Social Icons */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  aria-label="Sign in with Google"
                >
                  <Google sx={{ color: "#4285f4", fontSize: 28 }} />
                </IconButton>

                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  aria-label="Sign in with Facebook"
                >
                  <Facebook sx={{ color: "#1877f2", fontSize: 28 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : (
          // Desktop Layout (Horizontal)
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100vh",
            }}
          >
            {/* Left Side - Large Logo */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F8F5F2",
              }}
            >
              <Box sx={{ maxWidth: 400 }}>
                <Logo size={300} />
              </Box>
            </Box>

            {/* Right Side - Content */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
                px: 6,
              }}
            >
              {/* Text Content */}
              <Box
                sx={{
                  mb: 4,
                  textAlign: "center",
                  maxWidth: 500,
                  paddingTop: 4,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 400,
                    mb: 3,
                    fontSize: "3.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  Welcome to Dotsquare
                </Typography>

                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontWeight: 300,
                    fontSize: "1.5rem",
                    lineHeight: 1.6,
                  }}
                >
                  Sign in to access your{" "}
                  <Typography
                    component="span"
                    sx={{
                      color: "#8FA67C",
                      fontWeight: 400,
                      fontSize: "inherit",
                    }}
                  >
                    personalized wellness dashboard
                  </Typography>{" "}
                  and continue your health journey.
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ width: "100%", maxWidth: 400, mb: 5 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#A0634C",
                    color: "white",
                    py: 1.8,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: 25,
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#8F5A45",
                    },
                  }}
                  onClick={() => router.push("/role-selection")}
                >
                  Create Account
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#A0634C",
                    color: "#A0634C",
                    py: 1.8,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: 25,
                    "&:hover": {
                      borderColor: "#8F5A45",
                      color: "#8F5A45",
                    },
                  }}
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
              </Box>

              {/* Social Login Section */}
              <Box sx={{ width: "100%", maxWidth: 400 }}>
                <Divider sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ color: "#2C2C2C", px: 3 }}>
                    Or sign in with
                  </Typography>
                </Divider>

                {/* Social Icons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                  <IconButton
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    aria-label="Sign in with Google"
                  >
                    <Google sx={{ color: "#4285f4", fontSize: 32 }} />
                  </IconButton>

                  <IconButton
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    aria-label="Sign in with Facebook"
                  >
                    <Facebook sx={{ color: "#1877f2", fontSize: 32 }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
