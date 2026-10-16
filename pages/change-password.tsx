import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { changePassword } from "@/utils/api/change-password";
import { ChangePasswordValidationErrors, validateChangePasswordForm } from "@/utils/validations/changePasswordValidation";

interface ChangePasswordPageProps {
  user: {
    token?: string;
  };
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formErrors, setFormErrors] = useState<ChangePasswordValidationErrors>({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const token = user?.token || "";

  const handleChange =
    (field: "currentPassword" | "newPassword" | "confirmPassword") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (field === "currentPassword") setCurrentPassword(value);
      if (field === "newPassword") setNewPassword(value);
      if (field === "confirmPassword") setConfirmPassword(value);

      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setFormErrors({});

    const errors = validateChangePasswordForm({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
        token
      });

      if (response.ok) {
        setSuccessMsg("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMsg(response.data?.message || "Failed to change password.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card sx={{ borderRadius: 0.8, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Current Password"
              type={showCurrent ? "text" : "password"}
              fullWidth
              margin="normal"
              value={currentPassword}
               onChange={handleChange("currentPassword")}
              error={!!formErrors.currentPassword}
              helperText={formErrors.currentPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#A0634C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrent((show) => !show)}
                      edge="end"
                      aria-label="toggle current password visibility"
                    >
                      {showCurrent ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="New Password"
              type={showNew ? "text" : "password"}
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={handleChange("newPassword")}
              error={!!formErrors.newPassword}
              helperText={formErrors.newPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#A0634C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNew((show) => !show)}
                      edge="end"
                      aria-label="toggle new password visibility"
                    >
                      {showNew ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm New Password"
              type={showConfirm ? "text" : "password"}
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#A0634C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((show) => !show)}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMsg && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMsg}
              </Alert>
            )}
            {successMsg && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {successMsg}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Change Password"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChangePasswordPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = session?.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
