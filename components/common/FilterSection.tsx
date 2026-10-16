import React from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Checkbox, FormControlLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterSection: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Date/Time</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <FormControlLabel control={<Checkbox />} label="Today" />
          <FormControlLabel control={<Checkbox />} label="This Week" />
        </Stack>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Modality</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <FormControlLabel control={<Checkbox />} label="Yoga" />
          <FormControlLabel control={<Checkbox />} label="Sound Healing" />
        </Stack>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Location</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <FormControlLabel control={<Checkbox />} label="Denver" />
          <FormControlLabel control={<Checkbox />} label="Boulder" />
        </Stack>
      </AccordionDetails>
    </Accordion>
  </Box>
);

export default FilterSection;