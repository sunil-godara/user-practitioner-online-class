import React from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import {
  Box,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

interface Booking {
  id: number;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
  practitioner: string;
}

interface BookingPageProps {
  bookings: Booking[];
}

const BookingPage: React.FC<BookingPageProps> = ({ bookings }) => {
  const upcoming = bookings.filter(b => b.status === "upcoming");
  const past = bookings.filter(b => b.status === "past");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F1ED",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#7B7F4D", mb: 2 }}>
          My Bookings
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          Upcoming Bookings
        </Typography>
        {upcoming.length === 0 ? (
          <Typography variant="body2" sx={{ mb: 2 }}>
            No upcoming bookings.
          </Typography>
        ) : (
          upcoming.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          Past Bookings
        </Typography>
        {past.length === 0 ? (
          <Typography variant="body2">No past bookings.</Typography>
        ) : (
          past.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </Box>
    </Box>
  );
};

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => (
  <Box
    sx={{
      mb: 2,
      p: 2,
      border: "1px solid #e0d9d0",
      borderRadius: "10px",
      backgroundColor: "#fdfaf7",
    }}
  >
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {booking.service}
    </Typography>
    <Typography variant="body2" sx={{ color: "#555" }}>
      {booking.date} at {booking.time}
    </Typography>
    <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
      Practitioner: {booking.practitioner}
    </Typography>
    <Chip
      label={booking.status === "upcoming" ? "Upcoming" : "Past"}
      color={booking.status === "upcoming" ? "success" : "default"}
      size="small"
    />
  </Box>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Dummy data
  const bookings: Booking[] = [
    {
      id: 1,
      service: "Yoga Therapy",
      date: "2025-07-25",
      time: "10:00 AM",
      status: "upcoming",
      practitioner: "Sophie Wells",
    },
    {
      id: 2,
      service: "Breathwork Session",
      date: "2025-06-30",
      time: "3:00 PM",
      status: "past",
      practitioner: "Liam Patel",
    },
    {
      id: 3,
      service: "Sound Healing",
      date: "2025-08-02",
      time: "11:30 AM",
      status: "upcoming",
      practitioner: "Maya Singh",
    },
  ];

  return {
    props: {
      bookings,
    },
  };
};

export default BookingPage;
