import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";

export interface Practitioner {
  id: number;
  name: string;
  bio: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  avatar: string;
  isFavorited: boolean;
  practitionerProfile: {
    bio: string;
  };
  practitionerModalities: {
    modality: {
      name: string;
      slug: string;
      description: string;
      iconUrl: string;
    };
  }[];
}

interface PractitionerCardProps {
  practitioner: Practitioner;
}

const PractitionerCard: React.FC<PractitionerCardProps> = ({
  practitioner,
}) => {
  const router = useRouter();

  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/practitioner/${practitioner.id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 0.8,
        boxShadow: "0 4px 16px rgba(160,99,76,0.10)",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 8px 32px rgba(160,99,76,0.18)" },
        cursor: "pointer",
        minWidth: 0,
        p: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onClick={handleViewMore}
    >
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            alt={practitioner.name}
            src={practitioner.avatar || "/default-profile.png"}
            sx={{ width: 64, height: 64 }}
          />
          <Box flex={1}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
              {practitioner.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: 36,
              }}
            >
              {practitioner.practitionerProfile?.bio || practitioner.bio}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="favorite"
              sx={{ color: "#A0634C" }}
              onClick={(e) => e.stopPropagation()}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              aria-label="share"
              sx={{ color: "#000" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ShareIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, flexWrap: "wrap" }}
        >
          <StarIcon sx={{ color: "#FFC107", fontSize: 20 }} />
          <Typography fontSize={15} fontWeight={500}>
            {practitioner.rating?.toFixed(1) || "4.7"}
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            ({practitioner.reviewCount || 0} reviews)
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {practitioner.practitionerModalities?.map((item, idx) => (
            <Chip
              key={item.modality.slug || idx}
              label={item.modality.name}
              size="small"
              sx={{
                background: "#E8D5C4",
                color: "#A0634C",
                fontWeight: 500,
                mr: 0.5,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="text"
          sx={{
            color: "#A0634C",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            px: 1.5,
            "&:hover": { textDecoration: "underline", background: "#F8F4F0" },
          }}
          onClick={handleViewMore}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PractitionerCard;
