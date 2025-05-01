"use client";
import { Button, Stack } from "@mui/material";
import ScheduleModal from "../../_component/ScheduleModal";
import { useState } from "react";
import DoctorScheduleModel from "../../_component/DoctorScheduleModel";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create My Schedule</Button>
        <DoctorScheduleModel
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Stack>
    </div>
  );
};
export default SchedulesPage;
