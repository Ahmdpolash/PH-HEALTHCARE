"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack } from "@mui/material";
import ScheduleModal from "../../_component/ScheduleModal";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter } from "@/utils/dateFormatter";
import { ISchedule } from "@/types/schedule";
import dayjs from "dayjs";
import { toast } from "sonner";

const SchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading } = useGetAllSchedulesQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();

  const schedules = data?.schedules;
  const meta = data?.meta;

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule) => {
      return {
        id: schedule?.id,
        startDate: dateFormatter(schedule?.startDateTime),
        endDate: dateFormatter(schedule?.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success("Schedule deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton aria-label="delete">
              <DeleteIcon
                onClick={() => handleDelete(row.id)}
                sx={{ color: "red" }}
              />
            </IconButton>
            <IconButton aria-label="delete">
              <EditIcon sx={{}} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

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

        {!isLoading ? (
          <Box my={2}>
            <DataGrid rows={allSchedule ?? []} columns={columns} />
          </Box>
        ) : (
          <div className="min-h-[calc(100vh-160px)] grid place-items-center">
            <div className=" w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
          </div>
        )}
      </Box>
    </div>
  );
};
export default SchedulePage;
