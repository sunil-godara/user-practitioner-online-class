import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container, Typography, Grid } from "@mui/material";
import ClassCard from "@/components/class/ClassCard";
import RecommendedSection from "@/components/class/RecommendedSection";
import NoResults from "@/components/class/NoResults";
import {
  ClassItem,
  getClassListing,
  getRecommendedClassesList,
  getUpcomingClassesList,
} from "@/utils/api/class-management";
import { formatDate } from "@/utils/helpers";

interface ClassListingsPageProps {
  allClasses: ClassItem[];
  recommendedClasses: ClassItem[];
  upcomingClasses: ClassItem[];
}

const ClassListingsPage: React.FC<ClassListingsPageProps> = ({
  allClasses,
  recommendedClasses,
  upcomingClasses,
}) => {
  const router = useRouter();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        All Classes
      </Typography>
      {allClasses.length ? (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {allClasses.map((classData) => (
            <Grid size={{ md: 6 }} key={classData.id}>
              <ClassCard
                image="https://placehold.co/320x360/fff/000000?text=Class%20Image"
                title={classData.title}
                practitioner={classData.practitioner.name}
                modality={
                  classData.classModalities?.length
                    ? classData.classModalities
                        .map(
                          (modalityData) => modalityData.modality?.name || ""
                        )
                        .filter(Boolean)
                        .join(", ")
                    : "N/A"
                }
                datetime={
                  formatDate("MM/dd/yy - h:mmaaa", classData.dateTime) ?? ""
                }
                location={`${classData.studio.name}, ${classData.studio.location}`}
                price={`$${classData.price}`}
                onBook={() => router.push(`/class/${classData.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoResults message="No classes found." />
      )}

      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Upcoming Classes
      </Typography>
      {upcomingClasses.length ? (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {upcomingClasses.map((classData) => (
            <Grid size={{ md: 6 }} key={classData.id}>
              <ClassCard
                image="https://placehold.co/320x360/fff/000000?text=Class%20Image"
                title={classData.title}
                practitioner={classData.practitioner.name}
                modality={classData.modalities[0]?.name || "N/A"}
                datetime={
                  formatDate("MM/dd/yy - h:mmaaa", classData.dateTime) ?? ""
                }
                location={`${classData.studio.name}, ${classData.studio.location}`}
                price={`$${classData.price}`}
                onBook={() => router.push(`/class/${classData.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoResults message="No upcoming classes." />
      )}

      <RecommendedSection recommendedClasses={recommendedClasses} />
    </Container>
  );
};

export default ClassListingsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = session?.user.token || "";

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const allClasses = await getClassListing(token);
  const recommendedClasses = await getRecommendedClassesList(token);
  const upcomingClasses = await getUpcomingClassesList(token);

  return {
    props: {
      allClasses,
      recommendedClasses,
      upcomingClasses,
    },
  };
};
