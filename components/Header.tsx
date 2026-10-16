import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  // Badge,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Event as EventIcon,
  LockReset as LockResetIcon,
  // Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserRole } from "@/types";
import Image from "next/image";

interface LogoProps {
  userRole: string;
}

const Logo: React.FC<LogoProps> = ({ userRole }) => {
  const router = useRouter();

  const handleLogoClick = () => {
    const dashboardRoute =
      userRole === "practitioner" ? "/practitioner-dashboard" : "/dashboard";
    router.push(dashboardRoute);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: 1 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: 1,
          cursor: "pointer",
        }}
        onClick={handleLogoClick}
      >
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={180}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

interface HeaderProps {
  userRole?: UserRole;
}

const Header: React.FC<HeaderProps> = ({ userRole = "user" }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          minHeight: "70px",
        }}
      >
        <Logo userRole={userRole} />

        {session?.user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {/* Notification Icon */}
            {/* <IconButton
              size="medium"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
              }}
              >
              <Badge badgeContent={3} color="error">
              <NotificationsIcon />
              </Badge>
              </IconButton> */}

            {/* User Info */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={handleMenuClick}
              >
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {session.user.name}{" "}
                  <Chip
                    label={userRole}
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor:
                        userRole === "practitioner" ? "#E8F5E9" : "#E3F2FD",
                      color:
                        userRole === "practitioner" ? "#2E7D32" : "#1565C0",
                      fontWeight: 500,
                    }}
                  />
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {session.user.email}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#6B8B5C",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "6px",
                }}
              >
                {session.user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              onClick={handleMenuClick}
              sx={{
                display: { md: "none" },
                backgroundColor: "#f5f5f5",
                width: 34,
                height: 34,
                borderRadius: "50%",
                padding: 4,
              }}
            >
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#6B8B5C",
                  color: "white",
                  fontSize: "0.875rem",
                }}
              >
                {session.user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            {/* User Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 3,
                sx: {
                  minWidth: 240,
                  borderRadius: 1,
                  mt: 1.5,
                  py: 0.5,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.2,
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                },
              }}
            >
              {/* User Info in Menu */}
              <Box
                sx={{
                  p: 1,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {session.user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 0.5 }}
                >
                  {session.user.email}
                </Typography>
                <Chip
                  label={`${userRole} Account`}
                  size="small"
                  sx={{
                    mt: 1,
                    textTransform: "capitalize",
                    backgroundColor:
                      userRole === "practitioner" ? "#E8F5E9" : "#E3F2FD",
                    color: userRole === "practitioner" ? "#2E7D32" : "#1565C0",
                  }}
                />
              </Box>

              {/* <MenuItem onClick={handleDashboard}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <DashboardIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    userRole === "practitioner"
                      ? "Practitioner Dashboard"
                      : "Dashboard"
                  }
                />
              </MenuItem> */}

              <Tooltip title="Profile">
                <MenuItem onClick={() => router.push("/profile")}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PersonIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
              </Tooltip>

              <MenuItem onClick={() => router.push("/bookings")}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <EventIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="My Bookings" />
              </MenuItem>

              <MenuItem onClick={() => router.push("/change-password")}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LockResetIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </MenuItem>

              <MenuItem onClick={() => router.push("/settings")}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <SettingsIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>

              <Divider sx={{ my: 0.5 }} />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Sign Out" sx={{ color: "error.main" }} />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
