import React from "react";
import { Typography } from "@mui/material";

const ClassStep: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Step 3: Review & Next Steps
      </Typography>
      <Typography variant="body1" mb={4}>
        You&apos;re almost done! Once your profile is complete, you&apos;ll be
        able to create a studio room and set up your first class. After
        submitting your class details, please wait for admin approval before it
        goes live.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Complete your profile → Create a studio room → Add class details → Await
        admin approval
      </Typography>
    </>
  );
};

export default ClassStep;
