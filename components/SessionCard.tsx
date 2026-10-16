import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Rating,
  Chip,
} from "@mui/material";
import {
  Star,
  StarBorder,
  Share,
  Schedule,
  LocationOn,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { SessionCardProps } from "@/types";

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  variant = "default",
  showFavorite = true,
  showShare = true,
  onClick,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/session-detail?id=${session.id}`);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle favorite logic here
    console.log("Toggle favorite for session:", session.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle share logic here
    console.log("Share session:", session.id);
  };

  const isCompact = variant === "compact";

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 0.6,
        cursor: "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          transform: "translateY(-2px)",
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ p: isCompact ? 2 : 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            src={
              session.avatar ||
              "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4"
            }
            sx={{
              width: isCompact ? 50 : 60,
              height: isCompact ? 50 : 60,
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
                gap: 1,
              }}
            >
              <Typography
                variant={isCompact ? "body1" : "h6"}
                sx={{
                  fontWeight: 600,
                  fontSize: isCompact ? "0.9rem" : "1rem",
                  lineHeight: 1.3,
                  color: "text.primary",
                }}
              >
                {session.practitioner} - {session.title}
              </Typography>

              <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                {showFavorite && (
                  <IconButton
                    size="small"
                    onClick={handleFavoriteClick}
                    sx={{
                      color: session.isFavorited ? "#FFD700" : "#ccc",
                      "&:hover": {
                        color: "#FFD700",
                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                      },
                    }}
                  >
                    {session.isFavorited ? (
                      <Star sx={{ fontSize: 20 }} />
                    ) : (
                      <StarBorder sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                )}
                {showShare && (
                  <IconButton
                    size="small"
                    onClick={handleShareClick}
                    sx={{
                      color: "#6B8B5C",
                      "&:hover": {
                        backgroundColor: "rgba(107, 139, 92, 0.1)",
                      },
                    }}
                  >
                    <Share sx={{ fontSize: 20 }} />
                  </IconButton>
                )}
              </Box>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                fontSize: isCompact ? "0.8rem" : "0.875rem",
              }}
            >
              {session.type}
              {session.price && ` | ${session.price}`}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 1,
                flexWrap: "wrap",
              }}
            >
              <Schedule sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: isCompact ? "0.75rem" : "0.8rem" }}
              >
                <strong>Date & Time:</strong> {session.datetime}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 1.5,
                flexWrap: "wrap",
              }}
            >
              <LocationOn sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: isCompact ? "0.75rem" : "0.8rem",
                  lineHeight: 1.3,
                }}
              >
                <strong>Location:</strong> {session.location}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={session.rating}
                  readOnly
                  size="small"
                  precision={0.1}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#FFD700",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: isCompact ? "0.75rem" : "0.8rem" }}
                >
                  {session.rating}/5
                </Typography>
              </Box>

              {session.spotsAvailable && (
                <Chip
                  label={`${session.spotsAvailable} spots available`}
                  size="small"
                  sx={{
                    backgroundColor:
                      session.spotsAvailable > 5 ? "#E8F5E8" : "#FFF3E0",
                    color: session.spotsAvailable > 5 ? "#2E7D32" : "#F57C00",
                    fontSize: "0.7rem",
                    height: 24,
                  }}
                />
              )}
            </Box>

            {/* Tags */}
            {session.tags && session.tags.length > 0 && (
              <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap" }}>
                {session.tags.slice(0, 3).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.65rem",
                      height: 20,
                      borderColor: "#6B8B5C",
                      color: "#6B8B5C",
                      "&:hover": {
                        backgroundColor: "rgba(107, 139, 92, 0.04)",
                      },
                    }}
                  />
                ))}
                {session.tags.length > 3 && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.65rem", alignSelf: "center" }}
                  >
                    +{session.tags.length - 3} more
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
