"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SpecialityModal } from "./_component/SpecialityModal";

const SpecialitiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <SpecialityModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialist" />
      </Stack>
    </Box>
  );
};
export default SpecialitiesPage;
