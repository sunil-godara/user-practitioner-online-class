import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  Event,
  Search,
  Person,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { BottomNavigationProps } from "@/types";

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage = "home",
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Note: BottomNavigation is typically only shown for users, not practitioners

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    // On mobile, show menu for profile options including logout
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push("/profile");
  };

  const handleDashboard = () => {
    handleMenuClose();
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#B5C9A6",
        borderRadius: "20px 20px 0 0",
        px: 2,
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        <Box sx={{ textAlign: "center", py: 1 }}>
          <IconButton onClick={() => router.push("/dashboard")}>
            <HomeIcon
              sx={{ color: currentPage === "home" ? "#2C2C2C" : "#6B8B5C" }}
            />
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: currentPage === "home" ? "#2C2C2C" : "#6B8B5C",
            }}
          >
            Home
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", py: 1 }}>
          <IconButton onClick={() => router.push("/upcoming-sessions")}>
            <Event
              sx={{ color: currentPage === "upcoming" ? "#2C2C2C" : "#6B8B5C" }}
            />
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: currentPage === "upcoming" ? "#2C2C2C" : "#6B8B5C",
            }}
          >
            Upcoming Sessions
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", py: 1 }}>
          <IconButton onClick={() => router.push("/find-session")}>
            <Search
              sx={{ color: currentPage === "search" ? "#2C2C2C" : "#6B8B5C" }}
            />
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: currentPage === "search" ? "#2C2C2C" : "#6B8B5C",
            }}
          >
            Find a Session
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", py: 1, position: "relative" }}>
          <IconButton onClick={handleProfileClick}>
            <Person
              sx={{ color: currentPage === "profile" ? "#2C2C2C" : "#6B8B5C" }}
            />
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: currentPage === "profile" ? "#2C2C2C" : "#6B8B5C",
            }}
          >
            Profile
          </Typography>

          {/* Profile Menu for Mobile */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "center", vertical: "bottom" }}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 180,
                borderRadius: 2,
                mb: 1,
              },
            }}
          >
            {session?.user && (
              <>
                {/* User Info */}
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: "0.75rem" }}
                  >
                    {session.user.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {session.user.email}
                  </Typography>
                </Box>

                <MenuItem onClick={handleDashboard}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    primaryTypographyProps={{ fontSize: "0.875rem" }}
                  />
                </MenuItem>

                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile Settings"
                    primaryTypographyProps={{ fontSize: "0.875rem" }}
                  />
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign Out"
                    primaryTypographyProps={{ fontSize: "0.875rem" }}
                  />
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomNavigation;
