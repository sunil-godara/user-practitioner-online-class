import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import PractitionerCard from "@/components/practitioner/PractitionerCard";
import SearchBar from "@/components/common/SearchBar";
import PractitionerFilter from "@/components/practitioner/PractitionerFilter";

const practitioners = [
  {
    name: "Alex Kim",
    modality: "Sound Healing",
    location: "Boulder",
    avatar: "https://placehold.co/60x60/f2f2f2/000000?text=Alex",
  },
  {
    name: "Jamie Lee",
    modality: "Yoga",
    location: "Denver",
    avatar: "https://placehold.co/60x60/f2f2f2/000000?text=Jamie",
  },
];

const PractitionerDirectoryPage: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
      Practitioners
    </Typography>
    <SearchBar placeholder="Search practitioners..." />
    <PractitionerFilter />
    <Grid container spacing={2}>
      {practitioners.map((p, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <PractitionerCard {...p} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default PractitionerDirectoryPage;
