import React from "react";
import { Box, Container, Typography, Avatar, Stack, Chip, Divider, Button } from "@mui/material";
import { useRouter } from "next/router";

// Dummy fetch function (replace with your real API call)
// async function getPractitionerDetail(id: string, token: string) {
//   // Replace with real API call
//   return {
//     id,
//     name: "Alex Kim",
//     avatar: "https://placehold.co/120x120",
//     bio: "Certified sound healer with 10+ years experience. Passionate about holistic wellness and community healing.",
//     rating: 4.8,
//     reviewCount: 24,
//     specialties: ["Sound Healing", "Meditation"],
//     practitionerModalities: [
//       { modality: { name: "Sound Healing", slug: "sound-healing", description: "", iconUrl: "" } },
//       { modality: { name: "Meditation", slug: "meditation", description: "", iconUrl: "" } },
//     ],
//     isFavorited: false,
//     reviews: [
//       {
//         id: 1,
//         reviewer: "Jane Doe",
//         rating: 5,
//         comment: "Amazing session! Highly recommend.",
//         date: "2025-08-01",
//       },
//       {
//         id: 2,
//         reviewer: "John Smith",
//         rating: 4,
//         comment: "Very relaxing and professional.",
//         date: "2025-07-15",
//       },
//     ],
//   };
// }

interface PractitionerDetailProps {
  practitioner: any;
}

const PractitionerDetailPage: React.FC<PractitionerDetailProps> = ({ practitioner }) => {
  const router = useRouter();

  if (!practitioner) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Practitioner not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 4,
          mb: 4,
        }}
      >
        <Avatar
          src={practitioner.avatar}
          alt={practitioner.name}
          sx={{ width: 120, height: 120, mb: { xs: 2, sm: 0 } }}
        />
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {practitioner.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body1" fontWeight={500}>
              {practitioner.rating} ★
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({practitioner.reviewCount} reviews)
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
            {practitioner.practitionerModalities?.map((item: any, idx: number) => (
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
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            onClick={() => router.push("/booking?practitioner=" + practitioner.id)}
          >
            Book a Session
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {practitioner.bio}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Specialties
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 3 }}>
        {practitioner.specialties?.map((spec: string, idx: number) => (
          <Chip key={idx} label={spec} color="primary" variant="outlined" />
        ))}
      </Stack>

      <Typography variant="h6" gutterBottom>
        Reviews
      </Typography>
      <Box>
        {practitioner.reviews?.length ? (
          practitioner.reviews.map((review: any) => (
            <Box key={review.id} sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: "#F8F4F0" }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Typography fontWeight={600}>{review.reviewer}</Typography>
                <Typography fontSize={14} color="text.secondary">
                  {review.date}
                </Typography>
                <Typography fontSize={14} color="#FFC107">
                  {"★".repeat(review.rating)}
                </Typography>
              </Stack>
              <Typography variant="body2">{review.comment}</Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No reviews yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default PractitionerDetailPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params || {};
//   // Replace with your real session/token logic
//   const token = ""; // e.g., from session/cookies

//   // Replace with your real API call
//   const practitioner = await getPractitionerDetail(id as string, token);

//   return {
//     props: {
//       practitioner,
//     },
//   };