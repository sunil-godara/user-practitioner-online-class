import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  getModalityList,
  Modality,
  savePractitionerProfile,
} from "@/utils/api/modality-management";
import CustomStepper from "../../components/practitioner/CustomStepper";
import UserProfile, {
  UserProfile as UserProfileType,
} from "../../components/practitioner/UserProfile";
import StudioStep from "../../components/practitioner/StudioStep";
import ClassStep from "../../components/practitioner/ClassStep";
import { getPractitionerDetails } from "@/utils/api/practitioner-management";
import { StudioDetails } from "@/types";
import { createStudio } from "@/utils/api/studio-management";
import { useSnackbar } from "@/components/SnackbarProvider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const steps = ["Select Modality", "Set Up Studio", "Review & Next Steps"];

const CompleteProfile: React.FC = () => {
  const router = useRouter();
  const { showMessage } = useSnackbar();
  const { data: session } = useSession();

  const [activeStep, setActiveStep] = useState(0);
  const [modalityOptions, setModalityOptions] = useState<Modality[]>([]);
  const [loadingModalities, setLoadingModalities] = useState(true);
  const [hasStudio, setHasStudio] = useState(false);
  const [studioDetails, setStudioDetails] = useState<StudioDetails>({
    name: "",
    location: "",
    description: "",
    logoUrl: "",
  });

  const [profileData, setProfileData] = useState<UserProfileType>({
    userId: "",
    bio: "",
    certifications: "",
    stripeConnectId: "",
    commissionRate: 0,
    modalityIds: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const session = await getSession();

      if (!session || session.user.user_type !== "practitioner") {
        router.push("/login");
        return;
      }

      // if (!session.user.profile_incomplete) {
      //   router.push("/practitioner-dashboard");
      //   return;
      // }

      setPractitionerId(session.user.id);

      try {
        const [modalitiesRes, practitionerRes] = await Promise.all([
          getModalityList(session?.user?.token || ""),
          getPractitionerDetails(
            session?.user?.id || "",
            session?.user?.token || ""
          ),
        ]);

        setModalityOptions(modalitiesRes || []);

        if (practitionerRes?.practitionerProfile) {
          const profile =
            practitionerRes.practitionerProfile as UserProfileType;
          setProfileData({
            userId: profile.userId,
            bio: profile.bio || "",
            certifications: profile.certifications || "",
            stripeConnectId: profile.stripeConnectId || "",
            commissionRate: Number(profile.commissionRate || 0),
            modalityIds:
              practitionerRes.modalities?.map((m: { id: string }) => m.id) ||
              [],
          });
        }

        if (practitionerRes?.studios?.length > 0) {
          setHasStudio(true);
          const studio = practitionerRes.studios[0];
          setStudioDetails({
            name: studio.name || "",
            description: studio.description || "",
            location: studio.location || "",
            logoUrl: studio.logoUrl || "",
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setModalityOptions([]);
      } finally {
        setLoadingModalities(false);
      }
    };

    fetchSessionAndData();
  }, [router]);

  const validateStudio = () => {
    const newErrors: { [key: string]: string } = {};

    Object.entries(studioDetails).forEach(([key, value]) => {
      if (key === "logoUrl") {
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          newErrors.logoUrl = "Logo URL must be a valid link";
        }
      } else {
        if (!value.trim()) {
          newErrors[key] = `${key.replace("_", " ")} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfileData = () => {
    const newErrors: { [key: string]: string } = {};

    if (!profileData.bio.trim()) newErrors.bio = "Bio is required";
    if (profileData.certifications.length === 0)
      newErrors.certifications = "At least one certification is required";
    if (profileData.commissionRate <= 0)
      newErrors.commissionRate = "Commission rate must be greater than 0";
    if (profileData.modalityIds.length === 0)
      newErrors.modality = "Please select at least one modality";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStudioDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async () => {
    try {
      if (activeStep === 0) {
        if (!validateProfileData()) return;

        if (!practitionerId || !session?.user?.token) return;

        setSubmitting(true);
        const success = await savePractitionerProfile(session.user.token, {
          userId: practitionerId,
          bio: profileData.bio,
          certifications: profileData.certifications,
          stripeConnectId: profileData.stripeConnectId,
          commissionRate: profileData.commissionRate,
          modalityIds: profileData.modalityIds,
        });
        setSubmitting(false);

        if (!success) return;
      }

      if (activeStep === 1 && hasStudio) {
        if (!validateStudio()) return;

        await createStudio(studioDetails, session?.user?.token || "");
      }

      setErrors({});
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      console.error("Error in handleNext:", error);
      showMessage(
        error instanceof Error && error.message
          ? error.message
          : "Failed to complete action.",
        "error"
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setShowSuccessDialog(true);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ pl: 2 }}>
            <UserProfile
              formData={profileData}
              setFormData={setProfileData}
              modalityOptions={modalityOptions}
              loadingModalities={loadingModalities}
              error={errors.modality}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ pl: 2 }}>
            <StudioStep
              hasStudio={hasStudio}
              setHasStudio={setHasStudio}
              studioDetails={studioDetails}
              handleChange={handleChange}
              errors={errors}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ pl: 2 }}>
            <ClassStep />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={6} mb={4}>
        <Typography variant="h4" fontWeight={600} gutterBottom align="center">
          Complete Your Profile
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4} align="center">
          Follow the steps to set up your practitioner profile.
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <form noValidate>
            <CustomStepper activeStep={activeStep} steps={steps} />

            <Box>{renderStepContent(activeStep)}</Box>

            <Box
              display="flex"
              justifyContent={activeStep === 0 ? "flex-end" : "space-between"}
              mt={4}
            >
              {activeStep > 0 && (
                <Button onClick={handleBack} disabled={submitting}>
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={submitting}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
      <Dialog
        open={showSuccessDialog}
        onClose={() => {
          setShowSuccessDialog(false);
          router.push("/practitioner-dashboard");
        }}
        PaperProps={{
          sx: {
            borderRadius: 1,
            padding: 2,
            minWidth: 320,
            textAlign: "center",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CheckCircleOutlineIcon color="success" fontSize="large" />
          Success
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            Your profile has been completed successfully!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You’ll now be redirected to your dashboard.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setShowSuccessDialog(false);
              router.push("/practitioner-dashboard");
            }}
          >
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompleteProfile;
