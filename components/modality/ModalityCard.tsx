import React from "react";
import { useRouter } from "next/router";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

type ModalityCardProps = {
  id?: string;
  name: string;
  iconUrl: string;
  description?: string;
};

const ModalityCard: React.FC<ModalityCardProps> = ({
  id,
  name,
  iconUrl,
  description,
}) => {
  const router = useRouter();
  return (
    <Card
      sx={{ borderRadius: 0.5, cursor: "pointer" }}
      onClick={() => {
        if (id) {
          router.push(`/modalities/${id}`);
        }
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={iconUrl}
        alt={name}
        sx={{ borderRadius: 0.5 }}
      />
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1">{description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModalityCard;
