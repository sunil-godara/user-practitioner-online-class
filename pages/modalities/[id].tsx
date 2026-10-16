import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  Typography,
  Card,
  CircularProgress,
  Button,
} from "@mui/material";
import { getModalityDetailById } from "@/utils/api/modality-management";

interface ModalityDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const ModalityDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [modality, setModality] = useState<ModalityDetail | null>(null);

  useEffect(() => {
    if (!id || !session?.user?.token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getModalityDetailById(
          id as string,
          session.user.token || ""
        );
        setModality(response || null);
      } catch (error) {
        console.error("Error fetching modality details:", error);
        setModality(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, session?.user?.token]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!modality) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Modality not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card
        sx={{
          borderRadius: 0.5,
          p: 3,
          boxShadow: "0 4px 24px rgba(160,99,76,0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={modality.iconUrl}
          alt={modality.name}
          sx={{
            width: 120,
            height: 120,
            objectFit: "contain",
            borderRadius: 0.5,
            bgcolor: "#F8F4F0",
            mb: 2,
          }}
        />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {modality.name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 2 }}
        >
          {modality.description}
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 3, borderRadius: 2 }}
          onClick={() => router.push("/modalities")}
        >
          Back to Modalities
        </Button>
      </Card>
    </Container>
  );
};

export default ModalityDetailPage;
