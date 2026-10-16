import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  Button,
  Box,
  Divider,
} from "@mui/material";

type ClassCardProps = {
  image: string;
  title: string;
  practitioner: string;
  modality: string;
  datetime: string;
  location: string;
  price: string;
  onBook?: () => void;
};

const ClassCard: React.FC<ClassCardProps> = ({
  image,
  title,
  practitioner,
  modality,
  datetime,
  location,
  price,
  onBook,
}) => (
  <Card
    sx={{
      mb: 3,
      borderRadius: 0.5,
      boxShadow: "0 6px 24px rgba(160,99,76,0.10)",
      overflow: "hidden",
      transition: "box-shadow 0.2s",
      "&:hover": { boxShadow: "0 8px 32px rgba(160,99,76,0.18)" },
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      minHeight: { sm: 180 },
      background: "linear-gradient(90deg, #F8F4F0 60%, #E8D5C4 100%)",
    }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        width: { xs: "100%", sm: 180 },
        height: { xs: 160, sm: "100%" },
        objectFit: "cover",
        borderRadius: { xs: "0", sm: "0 0 0 24px" },
      }}
    />
    <CardContent
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "text" }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {practitioner}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Chip
            label={modality}
            size="small"
            sx={{
              backgroundColor: "#A0634C22",
              color: "#A0634C",
              fontWeight: 500,
              height: 24,
            }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2">
            {datetime}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Typography variant="body2">
            {location}
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Chip
          label={price}
          sx={{
            borderRadius: "8px",
            fontWeight: 700,
                 backgroundColor: "#757575ff",
            color: "#fff",
            px: 2,
            py: 0.5,
            fontSize: "1rem",
          }}
        />
        <Button
          onClick={onBook}
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: 700,
            boxShadow: "none",
            fontSize: "1rem",
          }}
        >
          Book Now
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ClassCard;