"use client";
import { Button, Stack } from "@mui/material";

import { useState } from "react";
import DoctorScheduleModel from "../../_component/DoctorScheduleModel";
import { useGetAllDoctorScheduleQuery, useGetMyScheduleQuery } from "@/redux/api/doctorScheduleApi";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetAllDoctorScheduleQuery({});

  console.log(data);

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
