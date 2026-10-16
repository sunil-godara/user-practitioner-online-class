import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useSession } from "next-auth/react";
import { AppLayoutProps } from "@/types";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

const AppLayout: React.FC<AppLayoutProps> = ({ children, userRole }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session } = useSession();

  // Determine user role from session if not explicitly provided
  const currentUserRole = userRole || session?.user?.user_type || "user";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      {/* Header */}
      <Header userRole={currentUserRole} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          pb: isMobile ? 8 : 0, // Add bottom padding on mobile for bottom navigation
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation - Only show on mobile for users */}
      {isMobile && currentUserRole === "user" && session && (
        <BottomNavigation />
      )}
    </Box>
  );
};

export default AppLayout;
