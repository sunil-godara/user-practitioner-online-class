import React, { useState, useCallback } from "react";
import { shuffle } from "lodash";
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
  Stack,
  CircularProgress,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// --- Types ---
interface QuizOption {
  value: string;
  label: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  type: "single" | "multiple";
}

interface QuizAnswer {
  [questionId: string]: string | string[];
}

interface AIQuizResult {
  recommendedClasses: {
    title: string;
    description: string;
    tags: string[];
  }[];
  suggestedModalities: string[];
  focusAreas: string[];
}

// --- Dummy Data ---
const DUMMY_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is your primary wellness goal?",
    type: "single",
    options: [
      { value: "stress", label: "Reduce stress" },
      { value: "energy", label: "Increase energy" },
      { value: "flexibility", label: "Improve flexibility" },
      { value: "strength", label: "Build strength" },
    ],
  },
  {
    id: "q2",
    question: "Which activities do you enjoy?",
    type: "multiple",
    options: [
      { value: "yoga", label: "Yoga" },
      { value: "meditation", label: "Meditation" },
      { value: "dance", label: "Dance" },
      { value: "martial", label: "Martial Arts" },
    ],
  },
  {
    id: "q3",
    question: "How often do you want to practice?",
    type: "single",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "occasionally", label: "Occasionally" },
    ],
  },
  {
    id: "q4",
    question: "Preferred class environment?",
    type: "single",
    options: [
      { value: "group", label: "Group" },
      { value: "private", label: "Private" },
      { value: "virtual", label: "Virtual" },
    ],
  },
  {
    id: "q5",
    question: "Any physical limitations?",
    type: "multiple",
    options: [
      { value: "none", label: "None" },
      { value: "back", label: "Back issues" },
      { value: "knees", label: "Knee pain" },
      { value: "shoulders", label: "Shoulder pain" },
    ],
  },
  {
    id: "q6",
    question: "What time of day do you prefer?",
    type: "single",
    options: [
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening" },
    ],
  },
  {
    id: "q7",
    question: "Which of these best describes your experience level?",
    type: "single",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  },
];

// --- Main Component ---
const WellnessQuizPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffle(DUMMY_QUESTIONS).slice(0, 5 + Math.floor(Math.random() * 3))
  );
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIQuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleChange = useCallback((qid: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }, []);

  const handleRetake = () => {
    setQuestions(
      shuffle(DUMMY_QUESTIONS).slice(0, 5 + Math.floor(Math.random() * 3))
    );
    setAnswers({});
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quiz/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("Failed to get recommendations");
      const data = await res.json();
      setResult(data);
      // Simulate saving to user profile
      await fetch("/api/user/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizResults: data }),
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
    setLoading(false);
  }
};

  // UI
  if (result) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ borderRadius: 1, p: isMobile ? 2 : 4, mb: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Your AI-Powered Wellness Recommendations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Based on your quiz answers, here are your personalized suggestions.
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Recommended Classes
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {result.recommendedClasses.map((cls, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Card sx={{ p: 2, borderRadius: 1, bgcolor: "#F8F4F0" }}>
                  <Typography fontWeight={600}>{cls.title}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {cls.description}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {cls.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        color="secondary"
                      />
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Suggested Modalities
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
            {result.suggestedModalities.map((modality) => (
              <Chip
                key={modality}
                label={modality}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Wellness Focus Areas
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
            {result.focusAreas.map((area) => (
              <Chip
                key={area}
                label={area}
                color="success"
                variant="outlined"
              />
            ))}
          </Stack>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleRetake}>
            Retake Quiz
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 1, p: isMobile ? 2 : 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          AI-Powered Wellness Quiz
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Answer a few questions to get personalized class and modality
          recommendations.
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Stack spacing={4}>
            {questions.map((q, idx) => (
              <Box key={q.id}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
                    {idx + 1}. {q.question}
                  </FormLabel>
                  {q.type === "single" ? (
                    <RadioGroup
                      value={answers[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    >
                      {q.options.map((opt) => (
                        <FormControlLabel
                          key={opt.value}
                          value={opt.value}
                          control={<Radio />}
                          label={opt.label}
                        />
                      ))}
                    </RadioGroup>
                  ) : (
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      {q.options.map((opt) => (
                        <Chip
                          key={opt.value}
                          label={opt.label}
                          clickable
                          color={
                            Array.isArray(answers[q.id]) &&
                            (answers[q.id] as string[]).includes(opt.value)
                              ? "primary"
                              : "default"
                          }
                          onClick={() => {
                            const prev = Array.isArray(answers[q.id])
                              ? (answers[q.id] as string[])
                              : [];
                            if (prev.includes(opt.value)) {
                              handleChange(
                                q.id,
                                prev.filter((v) => v !== opt.value)
                              );
                            } else {
                              handleChange(q.id, [...prev, opt.value]);
                            }
                          }}
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Stack>
                  )}
                </FormControl>
              </Box>
            ))}
          </Stack>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleRetake}
              disabled={loading}
            >
              Retake Quiz
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default WellnessQuizPage;
