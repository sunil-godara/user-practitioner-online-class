import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder || "Search..."}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

export default SearchBar;