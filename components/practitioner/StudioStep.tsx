import React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { StudioDetails } from "@/types";

interface StudioStepProps {
  hasStudio: boolean;
  setHasStudio: (value: boolean) => void;
  studioDetails: StudioDetails;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: { [key: string]: string };
}

const StudioStep: React.FC<StudioStepProps> = ({
  hasStudio,
  setHasStudio,
  studioDetails,
  handleChange,
  errors,
}) => {
  const fields: {
    name: keyof StudioDetails;
    label: string;
    multiline?: boolean;
  }[] = [
    { name: "name", label: "Studio Name" },
    { name: "location", label: "Location", multiline: true },
    { name: "description", label: "Description", multiline: true },
    { name: "logoUrl", label: "Logo URL" },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Step 2: Studio Information
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={hasStudio}
            onChange={(e) => setHasStudio(e.target.checked)}
          />
        }
        label="I have a physical studio location"
        sx={{ mt: 2 }}
      />

      {hasStudio && (
        <Box mt={3}>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {"Please provide your studio's details below."}
          </Typography>

          {fields.map(({ name, label, multiline }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              value={studioDetails[name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors[name]}
              helperText={errors[name]}
              multiline={multiline}
              minRows={multiline ? 3 : undefined}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default StudioStep;
