import React from "react";
import { useRouter } from "next/router";
import { Box, Grid, Typography } from "@mui/material";
import ClassCard from "./ClassCard";
import { ClassItem } from "@/utils/api/class-management";
import { formatDate } from "@/utils/helpers";

interface RecommendedPageProps {
  recommendedClasses: ClassItem[];
}

const RecommendedSection: React.FC<RecommendedPageProps> = ({
  recommendedClasses,
}) => {
const router = useRouter();
  
  return (
    <Box sx={{ mt: 4, pb: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Recommended for you
      </Typography>

      {recommendedClasses?.length ? (
        <Grid container spacing={3}>
          {recommendedClasses.map((classItem) => (
            <Grid item xs={12} sm={6} key={classItem.id}>
              <ClassCard
                image="https://placehold.co/320x340/fff/000000?text=Class%20Image"
                title={classItem.title}
                practitioner={classItem.practitioner.name}
                modality={classItem.modalities[0]?.name || "N/A"}
                datetime={
                  formatDate("MM/dd/yy - h:mmaaa", classItem.dateTime) ?? ""
                }
                location={`${classItem.studio.name}, ${classItem.studio.location}`}
                price={`$${classItem.price}`}
                onBook={() => router.push(`/class/${classItem.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary" align="center">
          No recommendations yet.
        </Typography>
      )}
    </Box>
  );
};

export default RecommendedSection;
