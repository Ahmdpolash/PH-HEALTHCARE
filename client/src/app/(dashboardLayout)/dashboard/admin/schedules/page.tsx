"use client";
import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import ScheduleModal from "../../_component/ScheduleModal";

const SchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
          <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
        </Stack>

        {/* {!isLoading ? (
          <Box my={2}>
            <DataGrid rows={doctors} columns={columns} />
          </Box>
        ) : (
          <div className="min-h-[calc(100vh-160px)] grid place-items-center">
            <div className=" w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
          </div>
        )} */}
      </Box>
    </div>
  );
};
export default SchedulePage;
