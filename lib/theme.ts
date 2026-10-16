import { createTheme } from "@mui/material/styles";

// Extend the theme palette to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    accent: {
      beige: string;
      lightGreen: string;
      gold: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      beige?: string;
      lightGreen?: string;
      gold?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B8B5C", // Dark green from the designs
      light: "#8FA67C",
      dark: "#556847",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#A0634C", // Terracotta/brown for buttons
      light: "#B8846C",
      dark: "#7F4F3C",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F5F1ED", // Light beige background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C2C2C",
      secondary: "#6B8B5C",
    },
    accent: {
      beige: "#E8D5C4", // Accent beige sections
      lightGreen: "#B5C9A6",
      gold: "#FFD700", // For star ratings
    },
    divider: "#E0E0E0",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 25, // Rounded buttons like in design
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: "12px 32px",
          fontSize: "1rem",
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          "&.MuiButton-containedSecondary": {
            backgroundColor: "#A0634C",
            "&:hover": {
              backgroundColor: "#8F5A45",
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 15,
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: "#D0D0D0",
            },
            "&:hover fieldset": {
              borderColor: "#6B8B5C",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6B8B5C",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#B5C9A6",
          borderRadius: "20px 20px 0 0",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#6B8B5C",
          "&.Mui-selected": {
            color: "#2C2C2C",
          },
        },
      },
    },
  },
});

export default theme; 