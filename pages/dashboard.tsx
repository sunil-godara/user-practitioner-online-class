import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
// import { useRouter } from "next/router";
import SessionCard from "@/components/SessionCard";
import { Session } from "@/types";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session } = useSession();
  // const router = useRouter();

  // Updated featuredSessions data for better visual examples
  const featuredSessions: Session[] = [
    {
      id: "1",
      practitioner: "Alycia Wong",
      title: "The Way Hom",
      type: "Guided Thermotherapy | Breathwork",
      datetime: "July 16, 2025 - 7:00 - 8:30pm",
      location: "Traverse Fitness - 2449 S Broadway, Denver, CO 80210",
      rating: 4.7,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
    },
    {
      id: "2",
      practitioner: "Ben Carter",
      title: "Mindful Morning Flow",
      type: "Vinyasa Yoga | Meditation",
      datetime: "July 18, 2025 - 9:00 - 10:00am",
      location: "Urban Oasis Studio - 123 Main St, Denver, CO 80203",
      rating: 4.9,
      avatar:
        "https://unsplash.com/photos/a-group-of-people-sitting-at-a-table-PktK6GuC3U4",
    },
  ];

  const renderContent = () => (
    <>
      {/* Welcome Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ color: "text.secondary", fontWeight: 500, mb: 1 }}
        >
          Welcome, {session?.user?.name || "User"}
        </Typography>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ color: "text.primary" }}
        >
          Find Your Healing Path
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: 4,
            py: isMobile ? 1.5 : 2,
            px: isMobile ? 4 : 6,
            fontSize: isMobile ? "0.9rem" : "1.1rem",
            borderRadius: 25,
            textTransform: "none",
          }}
        >
          Take Your Personalized Dotsquare Wellness Quiz
        </Button>
      </Box>

      {/* Featured Sessions Section */}
      <Box
        sx={{
          backgroundColor: "#E8D5C4",
          borderRadius: 2,
          p: isMobile ? 3 : 5,
          mb: 6,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ textAlign: "center", mb: isMobile ? 3 : 4, fontWeight: 600 }}
        >
          Featured Sessions
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4}>
          {featuredSessions.map((sessionItem) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={sessionItem.id}>
              <SessionCard session={sessionItem} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Action Links */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant={isMobile ? "body1" : "h6"} sx={{ mb: 1 }}>
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Browse Classes/Events
          </Button>{" "}
          |{" "}
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Browse Practitioners
          </Button>
        </Typography>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          color="text.secondary"
        >
          <Button color="inherit" sx={{ textTransform: "none" }}>
            Give Dotsquare Gift Card
          </Button>
        </Typography>
      </Box>
    </>
  );

  return (
    <Box>
      {isMobile ? (
        <Container maxWidth="md" sx={{ px: 2, pt: 3 }}>
          {renderContent()}
        </Container>
      ) : (
        /* Desktop Layout with Sidebar (Assuming AppLayout handles the sidebar) */
        <Container maxWidth="lg" sx={{ pt: 5, pb: 8 }}>
          {renderContent()}
        </Container>
      )}
    </Box>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = session?.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
