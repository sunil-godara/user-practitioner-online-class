import React from "react";
import { Box, Typography } from "@mui/material";

const NoResults: React.FC<{ message?: string }> = ({ message }) => (
  <Box sx={{ py: 6, textAlign: "center" }}>
    <Typography variant="h6" color="text.secondary">
      {message || "No classes found."}
    </Typography>
  </Box>
);

export default NoResults;