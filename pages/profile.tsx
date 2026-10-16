import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  // useTheme,
  // useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "@/components/SnackbarProvider";
import { User } from "@/types";
import { validateProfileForm } from "@/utils/validations/profileValidation";
import { updateUserProfile } from "@/utils/api/profile";
import { AxiosError } from "axios";

interface ProfilePageProps {
  userDetails: User & {
    company_name?: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userDetails }) => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { showMessage } = useSnackbar();
  const { update: updateSession } = useSession();
  const isPractitioner = userDetails?.role === "practitioner";
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: userDetails?.name || "",
    email: userDetails?.email || "",
    phone: userDetails?.phone || "",
    zipCode: userDetails?.zipCode || "",
    companyName: userDetails?.company_name || "",
  });

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

  const handleSubmit = async () => {
    const validationErrors = validateProfileForm({
      fullName: form.fullName,
      zipCode: form.zipCode,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await updateUserProfile({
        name: form.fullName,
        zipCode: form.zipCode,
        ...(isPractitioner && { company_name: form.companyName }),
      });

      setLoading(false);

      if (response.ok === true) {
        await updateSession({
          user: {
            ...userDetails,
            name: form.fullName,
            zipCode: form.zipCode,
            ...(isPractitioner && { company_name: form.companyName }),
          },
        });
        showMessage(response.data.message, "success");
      } else {
        showMessage(response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        showMessage(
          error.response?.data?.message || "Failed to update profile",
          "error"
        );
      } else {
        showMessage("An unexpected error occurred", "error");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F1ED",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#7B7F4D", mb: 2 }}
        >
          My Profile
        </Typography>

        <TextField
          fullWidth
          label="Name"
          value={form.fullName}
          onChange={handleChange("fullName")}
          sx={textFieldStyle}
          helperText={errors.fullName}
        />

        {isPractitioner && (
          <TextField
            fullWidth
            label="Company Name"
            value={form.companyName}
            onChange={handleChange("companyName")}
            sx={textFieldStyle}
            helperText={errors.companyName}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          value={form.email}
          sx={textFieldStyle}
          disabled
        />

        <TextField
          fullWidth
          label="Phone"
          value={form.phone}
          sx={textFieldStyle}
          disabled
        />

        <TextField
          fullWidth
          label="Zip Code"
          value={form.zipCode}
          onChange={handleChange("zipCode")}
          sx={textFieldStyle}
          helperText={errors.zipCode}
        />

        <Button
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.6,
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "10px",
            backgroundColor: "#8B4720",
            color: "white",
            "&:hover": {
              backgroundColor: "#7a3f1d",
            },
          }}
        >
          {loading ? <CircularProgress /> : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};

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
      userDetails: user,
    },
  };
};

export default ProfilePage;

const textFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#A0634C",
    },
  },
  "& label": {
    color: "#000",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
};
