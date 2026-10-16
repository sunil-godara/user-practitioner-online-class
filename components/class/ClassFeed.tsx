import React from "react";
import { Box } from "@mui/material";
import ClassCard from "./ClassCard";
import NoResults from "./NoResults";

type ClassFeedProps = {
  classes: Array<{
    image: string;
    title: string;
    practitioner: string;
    modality: string;
    datetime: string;
    location: string;
    price: string;
  }>;
};

const ClassFeed: React.FC<ClassFeedProps> = ({ classes }) => (
  <Box>
    {classes.length ? (
      classes.map((c, i) => <ClassCard key={i} {...c} />)
    ) : (
      <NoResults message="No classes available." />
    )}
  </Box>
);

export default ClassFeed;