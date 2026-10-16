import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Button,
  CircularProgress,
  Card,
} from "@mui/material";
import { ClassDetail, getClassDetailById } from "@/utils/api/class-management";
import { formatDate } from "@/utils/helpers";

const ClassDetailPage: React.FC = () => {
  const router = useRouter();
  const { id: classId } = router.query;
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState<ClassDetail | null>(null);

  useEffect(() => {
    if (!classId || !session?.user?.token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const detail = await getClassDetailById(
          classId as string,
          session.user.token || ""
        );
        setClassData(detail);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setClassData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classId, session?.user?.token]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!classData) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5" textAlign="center">
          Class not found.
        </Typography>
      </Container>
    );
  }

  const modalities =
    classData.classModalities?.length > 0
      ? classData.classModalities
          .map((mod) => mod.modality?.name)
          .filter(Boolean)
          .join(", ")
      : "N/A";

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Banner */}
      <Box mb={4}>
        <Image
          src="/img.jpg"
          alt="Class Banner"
          width={800}
          height={400}
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
        />
      </Box>

      {/* Title */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {classData.title}
      </Typography>

      {/* Description */}
      <Typography variant="body1" gutterBottom>
        {classData.description}
      </Typography>
<Stack
  direction="row"
  spacing={2}
  sx={{
    overflowX: { xs: "auto", md: "visible" },
    py: 1,
    "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
  }}
>
  <Card
    sx={{
      minWidth: 140,
      p: 1.5,
      textAlign: "center",
      borderRadius: 0.5,
      boxShadow: 1,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      Modality
    </Typography>
    <Typography fontWeight={600}>{modalities}</Typography>
  </Card>

  {classData.tags && (
    <Card sx={{ minWidth: 140, p: 1.5, textAlign: "center", borderRadius: 0.5, boxShadow: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Tags
      </Typography>
      <Typography fontWeight={600}>{classData.tags}</Typography>
    </Card>
  )}

  <Card sx={{ minWidth: 140, p: 1.5, textAlign: "center", borderRadius: 0.5, boxShadow: 1 }}>
    <Typography variant="body2" color="text.secondary">
      Date & Time
    </Typography>
    <Typography fontWeight={600}>
      {formatDate("MMM dd, yyyy - h:mmaaa", classData.dateTime)}
    </Typography>
  </Card>

  <Card sx={{ minWidth: 140, p: 1.5, textAlign: "center", borderRadius: 0.5, boxShadow: 1 }}>
    <Typography variant="body2" color="text.secondary">
      Duration
    </Typography>
    <Typography fontWeight={600}>{classData.durationMins} mins</Typography>
  </Card>

  <Card sx={{ minWidth: 140, p: 1.5, textAlign: "center", borderRadius: 0.5, boxShadow: 1 }}>
    <Typography variant="body2" color="text.secondary">
      Capacity
    </Typography>
    <Typography fontWeight={600}>{classData.capacity}</Typography>
  </Card>

  <Card sx={{ minWidth: 140, p: 1.5, textAlign: "center", borderRadius: 0.5, boxShadow: 1 }}>
    <Typography variant="body2" color="text.secondary">
      Price
    </Typography>
    <Typography fontWeight={600}>${classData.price}</Typography>
  </Card>
</Stack>

      <Divider sx={{ my: 3 }} />

      {/* Practitioner */}
      <Typography variant="h6">Practitioner:</Typography>
      <Typography>{classData.practitioner.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {classData.practitioner.email} | {classData.practitioner.phone}
      </Typography>

      {/* Location */}
      <Typography variant="h6" mt={3}>
        Location:
      </Typography>
      <Typography>
        {classData.studio.name}, {classData.studio.location}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Room: {classData.room.name} (Capacity: {classData.room.capacity})
      </Typography>

      {/* Book Button */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 4 }}
        onClick={() => alert(`Booking: ${classData.title}`)}
      >
        Book This Class
      </Button>
    </Container>
  );
};

export default ClassDetailPage;
