import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import Calendar from "@/components/Calendar";
import BottomNavigation from "@/components/BottomNavigation";
import { CalendarEvent } from "@/types";
import { useSession } from "next-auth/react";

const CalendarPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { data: session } = useSession();

  // Sample events data - in a real app, this would come from an API
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Exercise",
      practitioner: "Julie Wombat",
      startTime: "10:00am",
      endTime: "11:00am",
      date: new Date(2025, 6, 7), // July 7, 2025
      type: "Fitness",
    },
    {
      id: "2",
      title: "Run Left",
      practitioner: "Audrey Doorly",
      startTime: "12:00pm",
      endTime: "1:00pm",
      date: new Date(2025, 6, 7), // July 7, 2025
      type: "Running",
    },
    {
      id: "3",
      title: "Guided Thermotherapy + Breathwork",
      practitioner: "Alycia Wong - The Way Hom",
      startTime: "7:00pm",
      endTime: "8:30pm",
      date: new Date(2025, 6, 16), // July 16, 2025
      type: "Therapy",
    },
    {
      id: "4",
      title: "Morning Meditation",
      practitioner: "Sarah Wilson",
      startTime: "7:00am",
      endTime: "8:00am",
      date: new Date(2025, 6, 16), // July 16, 2025
      type: "Meditation",
    },
    {
      id: "5",
      title: "Cold Plunge Session",
      practitioner: "Mike Johnson",
      startTime: "6:00pm",
      endTime: "7:00pm",
      date: new Date(2025, 6, 20), // July 20, 2025
      type: "Cold Therapy",
    },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    router.push(`/session-detail?id=${event.id}`);
  };

  const handleBackClick = () => {
    router.back();
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
              mb: 3,
              gap: 2,
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

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textAlign: "center",
                flex: 1,
              }}
            >
              Class / Event
            </Typography>
          </Box>
          {/* Calendar Component */}
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
          />
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
                  mb: 4,
                  gap: 3,
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

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Class / Event Calendar
                </Typography>
              </Box>

              {/* Calendar Component */}
              <Calendar
                events={events}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                onEventClick={handleEventClick}
              />

              {/* Additional Information */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "#f8f9fa",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  About Your Schedule
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  View and manage your upcoming wellness sessions. Click on any
                  event to see more details or to modify your booking.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Legend: Events are color-coded by type. You can filter by
                  practitioner, session type, or location using the filters
                  above.
                </Typography>
              </Box>
            </Container>
          </Box>
          {/* Right Sidebar - Optional for future use */}
          <Box
            sx={{
              width: 80,
              backgroundColor: "#f8f9fa",
              flexShrink: 0,
              display: { xs: "none", lg: "block" },
            }}
          />
        </Box>
      )}
      {/* Bottom Navigation for Mobile */}
      {isMobile && session && <BottomNavigation currentPage="upcoming" />}
    </Box>
  );
};

export default CalendarPage;
