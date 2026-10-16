import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Pagination,
} from "@mui/material";
import { CalendarMonth, FilterList } from "@mui/icons-material";
import { useRouter } from "next/router";
import SessionCard from "@/components/SessionCard";
import FilterComponent from "@/components/FilterComponent";
import BottomNavigation from "@/components/BottomNavigation";
import { Session, FilterOptions } from "@/types";
import { useSession } from "next-auth/react";

const FindSessionPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { data: session } = useSession();

  const [filters, setFilters] = useState<FilterOptions>({
    modality: [],
    date: [],
    price: [],
    sessionType: [],
  });

  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 10;

  // Sample sessions data - in a real app, this would come from an API
  const allSessions: Session[] = [
    {
      id: "1",
      practitioner: "Alycia Wong",
      title: "The Way Hom",
      type: "Guided Thermotherapy | Breathwork",
      datetime: "07/16/25 - 7:00 - 8:30pm",
      location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
      rating: 4.7,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
      price: "$30",
      spotsAvailable: 3,
      isFavorited: true,
      tags: ["Breathwork", "Sauna", "Cold Plunge"],
    },
    {
      id: "2",
      practitioner: "Claudia Nanino",
      title: "Amarsi",
      type: "Guided Thermotherapy | Breathwork",
      datetime: "07/16/25 - 7:00 - 8:30pm",
      location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
      rating: 4.7,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
      price: "$30",
      spotsAvailable: 5,
      isFavorited: false,
      tags: ["Breathwork", "Meditation"],
    },
    {
      id: "3",
      practitioner: "Tommy Dill",
      title: "Soundularity",
      type: "Guided Thermotherapy | Breathwork",
      datetime: "07/16/25 - 7:00 - 8:30pm",
      location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
      rating: 4.7,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
      price: "$30",
      spotsAvailable: 8,
      isFavorited: true,
      tags: ["Sound Healing", "Meditation"],
    },
    {
      id: "4",
      practitioner: "Kate Kettlekamp",
      title: "Kronos",
      type: "Guided Thermotherapy | Breathwork",
      datetime: "07/16/25 - 7:00 - 8:30pm",
      location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
      rating: 4.7,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
      price: "$30",
      spotsAvailable: 2,
      isFavorited: false,
      tags: ["Yoga", "Breathwork"],
    },
    {
      id: "5",
      practitioner: "Jen Neapolitan",
      title: "Healing Sessions",
      type: "Guided Thermotherapy | Breathwork",
      datetime: "07/16/25 - 7:00 - 8:30pm",
      location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
      rating: 4.7,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
      price: "$30",
      spotsAvailable: 6,
      isFavorited: false,
      tags: ["Healing", "Energy Work"],
    },
  ];

  // Filter sessions based on active filters
  const filteredSessions = allSessions.filter((session) => session !== null);

  // Pagination
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
  const startIndex = (currentPage - 1) * sessionsPerPage;
  const currentSessions = filteredSessions.slice(
    startIndex,
    startIndex + sessionsPerPage
  );

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      modality: [],
      date: [],
      price: [],
      sessionType: [],
    });
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleCalendarClick = () => {
    router.push("/calendar");
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
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Sessions
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={handleCalendarClick}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <CalendarMonth sx={{ color: "#6B8B5C" }} />
              </IconButton>

              <IconButton
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  color: showFilters ? "#6B8B5C" : "#ccc",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <FilterList />
              </IconButton>
            </Box>
          </Box>
          {/* Filters */}
          {showFilters && (
            <FilterComponent
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          )}
          {/* Sessions List */}
          <Box sx={{ mb: 3 }}>
            {currentSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                variant="default"
                showFavorite={true}
                showShare={true}
              />
            ))}
          </Box>
          {/* Load More / Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#6B8B5C",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#6B8B5C",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
          {/* Additional Links */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
              All Sessions
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
              Starred Sessions + Practitioners
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Past Sessions
            </Typography>
          </Box>
          {/* Browse Links */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Browse Practitioners + Modalities
            </Typography>
          </Box>
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
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Find Sessions
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CalendarMonth />}
                    onClick={handleCalendarClick}
                    sx={{
                      borderColor: "#6B8B5C",
                      color: "#6B8B5C",
                      "&:hover": {
                        borderColor: "#556847",
                        backgroundColor: "rgba(107, 139, 92, 0.04)",
                      },
                    }}
                  >
                    Calendar View
                  </Button>

                  <Button
                    variant={showFilters ? "contained" : "outlined"}
                    startIcon={<FilterList />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{
                      borderColor: "#6B8B5C",
                      color: showFilters ? "white" : "#6B8B5C",
                      backgroundColor: showFilters ? "#6B8B5C" : "transparent",
                      "&:hover": {
                        borderColor: "#556847",
                        backgroundColor: showFilters
                          ? "#556847"
                          : "rgba(107, 139, 92, 0.04)",
                      },
                    }}
                  >
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </Button>
                </Box>
              </Box>

              {/* Filters */}
              {showFilters && (
                <FilterComponent
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              )}

              {/* Content Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 300px",
                  gap: 4,
                }}
              >
                {/* Sessions List */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    {filteredSessions.length} Sessions Found
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {currentSessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        variant="default"
                        showFavorite={true}
                        showShare={true}
                      />
                    ))}
                  </Box>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mb: 3 }}
                    >
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            color: "#6B8B5C",
                          },
                          "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#6B8B5C",
                            color: "white",
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Right Sidebar */}
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
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Quick Actions
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: "#6B8B5C",
                          color: "#6B8B5C",
                          "&:hover": {
                            borderColor: "#556847",
                            backgroundColor: "rgba(107, 139, 92, 0.04)",
                          },
                        }}
                      >
                        All Sessions
                      </Button>

                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: "#6B8B5C",
                          color: "#6B8B5C",
                          "&:hover": {
                            borderColor: "#556847",
                            backgroundColor: "rgba(107, 139, 92, 0.04)",
                          },
                        }}
                      >
                        Starred Sessions + Practitioners
                      </Button>

                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: "#6B8B5C",
                          color: "#6B8B5C",
                          "&:hover": {
                            borderColor: "#556847",
                            backgroundColor: "rgba(107, 139, 92, 0.04)",
                          },
                        }}
                      >
                        Past Sessions
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Browse Practitioners + Modalities
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      )}
      {/* Bottom Navigation for Mobile */}
      {isMobile && session && <BottomNavigation currentPage="search" />}
    </Box>
  );
};

export default FindSessionPage;
