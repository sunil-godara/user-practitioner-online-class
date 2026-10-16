import React from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface CustomStepperProps {
  activeStep: number;
  steps: string[];
}

const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep, steps }) => {
  const theme = useTheme();

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        mb: 6,
        "& .MuiStepLabel-label": {
          fontWeight: 600,
          color: theme.palette.text.primary,
          "&.Mui-active, &.Mui-completed": {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={label} completed={activeStep > index}>
          <StepLabel
            StepIconComponent={(props) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `2px solid ${
                    props.active || props.completed
                      ? theme.palette.primary.main
                      : theme.palette.grey[400]
                  }`,
                  bgcolor:
                    props.active || props.completed
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    props.active || props.completed
                      ? theme.palette.common.white
                      : theme.palette.text.secondary,
                  transition: "all 0.3s",
                }}
              >
                {props.completed ? (
                  <CheckCircleIcon fontSize="small" />
                ) : (
                  <Typography variant="body2">{index + 1}</Typography>
                )}
              </Box>
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
export default CustomStepper;
