import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Button,
  Avatar,
  Rating,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  Star,
  StarBorder,
  Share,
  Schedule,
  LocationOn,
  Person,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import MediaGallery from "@/components/MediaGallery";
import Reviews from "@/components/Reviews";
import BottomNavigation from "@/components/BottomNavigation";
import { Session } from "@/types";
import { useSession } from "next-auth/react";

const SessionDetailPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const { data: session } = useSession();

  // Sample session data - in a real app, this would come from an API based on the ID
  const sessionData: Session = {
    id: "1",
    practitioner: "Alycia Wong - The Way Hom",
    title: "Guided Thermotherapy + Breathwork",
    type: "Guided Thermotherapy | Breathwork",
    datetime: "07/16/25 - 7:00 - 8:30pm",
    location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
    rating: 4.7,
    avatar: "/api/placeholder/120/120",
    price: "$30",
    duration: "1.5 hours",
    spotsAvailable: 3,
    description:
      "Come join a class of 12 as we immerse into the experience of a cold plunge and sauna session, followed by 30 minutes of breathwork. This afternoon is designed to help you dive into your nervous system by using different modalities to calm the body and the mind.",
    tags: ["Breathwork", "Sauna", "Cold Plunge"],
    description:
      "Come join a class of 12 as we immerse into the experience of a cold plunge and sauna session, followed by 30 minutes of breathwork. This afternoon is designed to help you dive into your nervous system by using different modalities to calm the body and the mind.",
    tags: ["Breathwork", "Sauna", "Cold Plunge"],
    media: [
      {
        id: "1",
        type: "image",
        url: "/api/placeholder/300/200",
        alt: "Sauna session setup",
      },
      {
        id: "2",
        type: "image",
        url: "/api/placeholder/300/200",
        alt: "Breathwork space",
      },
      {
        id: "3",
        type: "image",
        url: "/api/placeholder/300/200",
        alt: "Cold plunge area",
      },
      {
        id: "4",
        type: "video",
        url: "/api/placeholder/video",
        thumbnail: "/api/placeholder/300/200",
        alt: "Session preview video",
      },
    ],
    reviews: [
      {
        id: "1",
        userName: "Tomi Fyrqvist",
        userAvatar: "/api/placeholder/50/50",
        rating: 5,
        comment:
          "Join us for a fun filled afternoon of love,Join us for a fun filled afternoon of love, laughter and living. Join us for a fun filled afternoon of love, laughter and living.",
        date: "2 month ago",
        reviewCount: 12,
        photoCount: 3,
      },
      {
        id: "2",
        userName: "Tomi Fyrqvist",
        userAvatar: "/api/placeholder/50/50",
        rating: 5,
        comment:
          "Join us for a fun filled afternoon of love,Join us for a fun filled afternoon of love, laughter and living. Join us for a fun filled afternoon of love, laughter and living.",
        date: "2 month ago",
        reviewCount: 12,
        photoCount: 3,
      },
    ],
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShareClick = () => {
    // Handle share logic
    console.log("Share session");
  };

  const handleRegisterClick = () => {
    // Handle registration logic
    console.log("Register for session");
  };

  const handleMessageClick = () => {
    // Handle message practitioner
    console.log("Message practitioner");
  };

  const handleChatClick = () => {
    // Handle chat with practitioner
    console.log("Chat with practitioner");
  };

  return (
    <Box sx={{ pb: isMobile ? 8 : 0, minHeight: "100vh" }}>
      {isMobile ? (
        /* Mobile Layout */
        <Container maxWidth="md" sx={{ px: 2, py: 2 }}>
          {/* Mobile Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <IconButton
              onClick={handleBackClick}
              sx={{
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ArrowBack sx={{ color: "#6B8B5C" }} />
            </IconButton>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={handleFavoriteClick}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  color: isFavorited ? "#FFD700" : "#ccc",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#FFD700",
                  },
                }}
              >
                {isFavorited ? <Star /> : <StarBorder />}
              </IconButton>

              <IconButton
                onClick={handleShareClick}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  color: "#6B8B5C",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Share />
              </IconButton>
            </Box>
          </Box>
          {/* Session Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
              lineHeight: 1.2,
            }}
          >
            {sessionData.title}
          </Typography>
          {/* Practitioner Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar src={sessionData.avatar} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {sessionData.practitioner}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={sessionData.rating}
                  readOnly
                  size="small"
                  precision={0.1}
                />
                <Typography variant="body2" color="text.secondary">
                  {sessionData.rating}/5
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Session Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              {sessionData.type} | {sessionData.price}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Schedule sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2">
                <strong>Date & Time:</strong> {sessionData.datetime}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocationOn sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2">
                <strong>Location:</strong> {sessionData.location}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Person sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2">
                <strong>Spots Available:</strong> {sessionData.spotsAvailable}
              </Typography>
            </Box>
          </Box>
          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            {sessionData.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                sx={{
                  borderColor: "#6B8B5C",
                  color: "#6B8B5C",
                }}
              />
            ))}
          </Box>
          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<LocationOn />}
              onClick={handleMessageClick}
              sx={{
                flex: 1,
                borderColor: "#6B8B5C",
                color: "#6B8B5C",
                "&:hover": {
                  borderColor: "#556847",
                  backgroundColor: "rgba(107, 139, 92, 0.04)",
                },
              }}
            >
              Message
            </Button>

            <Button
              variant="outlined"
              startIcon={<LocationOn />}
              onClick={handleChatClick}
              sx={{
                flex: 1,
                borderColor: "#6B8B5C",
                color: "#6B8B5C",
                "&:hover": {
                  borderColor: "#556847",
                  backgroundColor: "rgba(107, 139, 92, 0.04)",
                },
              }}
            >
              Chat
            </Button>
          </Box>
          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "text.primary" }}
            >
              {sessionData.description}
            </Typography>
          </Box>
          {/* Register Button */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={handleRegisterClick}
            sx={{
              mb: 4,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            Register for Session
          </Button>
          {/* Share Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Share
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              {/* Social share buttons would go here */}
              <IconButton sx={{ backgroundColor: "#3b5998", color: "white" }}>
                <Share />
              </IconButton>
              <IconButton sx={{ backgroundColor: "#e1306c", color: "white" }}>
                <Share />
              </IconButton>
              <IconButton sx={{ backgroundColor: "#1da1f2", color: "white" }}>
                <Share />
              </IconButton>
            </Box>
          </Box>
          {/* Media Gallery */}
          {sessionData.media && <MediaGallery media={sessionData.media} />}

          {/* Reviews */}
          {sessionData.reviews && (
            <Reviews
              reviews={sessionData.reviews}
              averageRating={sessionData.rating}
              totalReviews={sessionData.reviews.length}
            />
          )}
        </Container>
      ) : (
        /* Desktop Layout */
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {/* Left Sidebar */}
          <Box
            sx={{
              width: 120,
              backgroundColor: "#A0634C",
              flexShrink: 0,
            }}
          />
          {/* Main Content */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Container maxWidth="lg">
              {/* Desktop Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 4,
                }}
              >
                <IconButton
                  onClick={handleBackClick}
                  sx={{
                    backgroundColor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ArrowBack sx={{ color: "#6B8B5C" }} />
                </IconButton>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={handleFavoriteClick}
                    sx={{
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      color: isFavorited ? "#FFD700" : "#ccc",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        color: "#FFD700",
                      },
                    }}
                  >
                    {isFavorited ? <Star /> : <StarBorder />}
                  </IconButton>

                  <IconButton
                    onClick={handleShareClick}
                    sx={{
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      color: "#6B8B5C",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <Share />
                  </IconButton>
                </Box>
              </Box>

              {/* Content Grid */}
              <Box
                sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 4 }}
              >
                {/* Left Column */}
                <Box>
                  {/* Session Title */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "text.primary",
                      lineHeight: 1.2,
                    }}
                  >
                    {sessionData.title}
                  </Typography>

                  {/* Media Gallery */}
                  {sessionData.media && (
                    <MediaGallery media={sessionData.media} />
                  )}

                  {/* Description */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      Description
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.6, color: "text.primary" }}
                    >
                      {sessionData.description}
                    </Typography>
                  </Box>

                  {/* Reviews */}
                  {sessionData.reviews && (
                    <Reviews
                      reviews={sessionData.reviews}
                      averageRating={sessionData.rating}
                      totalReviews={sessionData.reviews.length}
                    />
                  )}
                </Box>

                {/* Right Column - Session Info */}
                <Box>
                  <Box
                    sx={{
                      position: "sticky",
                      top: 20,
                      backgroundColor: "white",
                      borderRadius: 3,
                      p: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Practitioner Info */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Avatar
                        src={sessionData.avatar}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {sessionData.practitioner}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Rating
                            value={sessionData.rating}
                            readOnly
                            size="small"
                            precision={0.1}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {sessionData.rating}/5
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Session Details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, color: "text.secondary", fontWeight: 500 }}
                      >
                        {sessionData.type} | {sessionData.price}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Schedule
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                        <Typography variant="body2">
                          <strong>Date & Time:</strong> {sessionData.datetime}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <LocationOn
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                        <Typography variant="body2">
                          <strong>Location:</strong> {sessionData.location}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Person
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                        <Typography variant="body2">
                          <strong>Spots Available:</strong>{" "}
                          {sessionData.spotsAvailable}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Tags */}
                    <Box
                      sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}
                    >
                      {sessionData.tags?.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: "#6B8B5C",
                            color: "#6B8B5C",
                          }}
                        />
                      ))}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={handleMessageClick}
                        sx={{
                          flex: 1,
                          borderColor: "#6B8B5C",
                          color: "#6B8B5C",
                          "&:hover": {
                            borderColor: "#556847",
                            backgroundColor: "rgba(107, 139, 92, 0.04)",
                          },
                        }}
                      >
                        Message
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={handleChatClick}
                        sx={{
                          flex: 1,
                          borderColor: "#6B8B5C",
                          color: "#6B8B5C",
                          "&:hover": {
                            borderColor: "#556847",
                            backgroundColor: "rgba(107, 139, 92, 0.04)",
                          },
                        }}
                      >
                        Chat
                      </Button>
                    </Box>

                    {/* Register Button */}
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      size="large"
                      onClick={handleRegisterClick}
                      sx={{
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        mb: 3,
                      }}
                    >
                      Register for Session
                    </Button>

                    {/* Share Section */}
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Share
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          sx={{ backgroundColor: "#3b5998", color: "white" }}
                        >
                          <Share />
                        </IconButton>
                        <IconButton
                          sx={{ backgroundColor: "#e1306c", color: "white" }}
                        >
                          <Share />
                        </IconButton>
                        <IconButton
                          sx={{ backgroundColor: "#1da1f2", color: "white" }}
                        >
                          <Share />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      )}
      {/* Bottom Navigation for Mobile */}
      {isMobile && session && <BottomNavigation />}
    </Box>
  );
};

export default SessionDetailPage;
