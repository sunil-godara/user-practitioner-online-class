import React from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  CircularProgress,
  Container,
  useTheme,
} from "@mui/material";

interface Modality {
  id: string;
  name: string;
}

export interface UserProfile {
  userId: string;
  bio: string;
  certifications: string;
  stripeConnectId: string;
  commissionRate: number;
  modalityIds: string[];
}

interface UserProfileProps {
  formData: UserProfile;
  setFormData: React.Dispatch<React.SetStateAction<UserProfile>>;
  modalityOptions: Modality[];
  loadingModalities: boolean;
  error?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  formData,
  setFormData,
  modalityOptions,
  loadingModalities,
  error,
}) => {
  const theme = useTheme();

  const handleChange = (
    field: keyof UserProfile,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleModalityToggle = (modalityId: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.modalityIds.includes(modalityId);
      const updatedIds = alreadySelected
        ? prev.modalityIds.filter((id) => id !== modalityId)
        : [...prev.modalityIds, modalityId];

      return { ...prev, modalityIds: updatedIds };
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Complete Your Profile
      </Typography>

      <Box mt={2}>
        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={3}
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Certifications"
          fullWidth
          value={formData.certifications}
          onChange={(e) => handleChange("certifications", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Commission Rate (%)"
          type="number"
          fullWidth
          value={formData.commissionRate}
          onChange={(e) =>
            handleChange("commissionRate", Number(e.target.value))
          }
          margin="normal"
        />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Select Modalities
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Choose the modalities you practice.
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            justifyContent: { xs: "flex-start", sm: "center" },
          }}
        >
          {loadingModalities ? (
            <CircularProgress size={24} />
          ) : modalityOptions.length > 0 ? (
            modalityOptions.map((mod) => {
              const isSelected = formData.modalityIds.includes(mod.id);
              return (
                <Chip
                  key={mod.id}
                  label={mod.name}
                  variant={isSelected ? "filled" : "outlined"}
                  color={isSelected ? "primary" : "default"}
                  onClick={() => handleModalityToggle(mod.id)}
                  sx={{
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    height: { xs: 36, sm: 40 },
                    px: 2,
                    "&.MuiChip-outlined": {
                      borderColor: theme.palette.grey[400],
                    },
                  }}
                />
              );
            })
          ) : (
            <Typography color="text.secondary">
              No modalities available.
            </Typography>
          )}
        </Box>
      </Box>

      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default UserProfile;
