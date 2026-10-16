import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PlayArrow,
  Close,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { MediaGalleryProps, MediaItem } from "@/types";

const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  autoPlay = false,
  showThumbnails = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const handleMediaClick = (index: number) => {
    setSelectedIndex(index);
    setFullscreenOpen(true);
  };

  const handleClose = () => {
    setFullscreenOpen(false);
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
    } else {
      setSelectedIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
    }
  };

  if (!media || media.length === 0) {
    return null;
  }

  const renderMediaItem = (
    item: MediaItem,
    index: number,
    isFullscreen = false
  ) => {
    const size = isFullscreen
      ? { width: "100%", height: "100%" }
      : { width: 150, height: 100 };

    return (
      <Box
        key={item.id}
        onClick={() => !isFullscreen && handleMediaClick(index)}
        sx={{
          position: "relative",
          cursor: isFullscreen ? "default" : "pointer",
          borderRadius: isFullscreen ? 0 : 0.5,
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          ...size,
          "&:hover": !isFullscreen
            ? {
                "& .play-overlay": {
                  opacity: item.type === "video" ? 1 : 0,
                },
              }
            : {},
        }}
      >
        {item.type === "image" ? (
          <Box
            component="img"
            src={item.url || "/api/placeholder/200/130"}
            alt={item.alt || "Gallery image"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <>
            <Box
              component="video"
              src={item.url}
              poster={item.thumbnail || "/api/placeholder/200/130"}
              autoPlay={autoPlay}
              controls={isFullscreen}
              muted={!isFullscreen}
              loop={autoPlay}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {!isFullscreen && (
              <Box
                className="play-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,1)",
                    },
                  }}
                >
                  <PlayArrow sx={{ fontSize: 32, color: "#6B8B5C" }} />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </Box>
    );
  };

  return (
    <>
      {/* Main Gallery */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            backgroundColor: "#E8D5C4",
            borderRadius: 0.3,
            p: 3,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                },
              },
            }}
          >
            {media.map((item, index) => renderMediaItem(item, index))}
          </Box>
        </Box>

        {showThumbnails && media.length > 4 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Box
              sx={{
                color: "text.secondary",
                fontSize: "0.9rem",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => handleMediaClick(0)}
            >
              All Media
            </Box>
          </Box>
        )}
      </Box>

      {/* Fullscreen Dialog */}
      <Dialog
        open={fullscreenOpen}
        onClose={handleClose}
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "black",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1000,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <Close />
          </IconButton>

          {/* Navigation buttons */}
          {media.length > 1 && (
            <>
              <IconButton
                onClick={() => handleNavigation("prev")}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1000,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={() => handleNavigation("next")}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1000,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          {/* Media content */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            {renderMediaItem(media[selectedIndex], selectedIndex, true)}
          </Box>

          {/* Media counter */}
          {media.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 20,
                fontSize: "0.875rem",
              }}
            >
              {selectedIndex + 1} / {media.length}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaGallery;
