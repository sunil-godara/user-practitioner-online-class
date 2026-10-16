import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Container, Typography, Grid, Box } from "@mui/material";
import ModalityCard from "@/components/modality/ModalityCard";
import { getModalityList, Modality } from "@/utils/api/modality-management";

interface ModalityDirectoryPageProps {
  allModalities: Modality[];
}

const ModalityDirectoryPage: React.FC<ModalityDirectoryPageProps> = ({ allModalities }) => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
        Wellness Modalities
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {allModalities.map((modality, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <Box sx={{ height: "100%", display: "flex" }}>
              <ModalityCard {...modality} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ModalityDirectoryPage;

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

  const modalities = await getModalityList(user.token || "");

  return {
    props: {
      allModalities: modalities,
    },
  };
};
