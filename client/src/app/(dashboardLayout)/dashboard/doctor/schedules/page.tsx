"use client";
import { Box, Button, IconButton, Pagination, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import DoctorScheduleModel from "../../_component/DoctorScheduleModel";
import {
  useDeleteDoctorScheduleMutation,
  useGetAllDoctorScheduleQuery,
  useGetMyScheduleQuery,
} from "@/redux/api/doctorScheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";

const SchedulesPage = () => {
  // pagiantion

  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);

  query["page"] = page;
  query["limit"] = limit;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteSchedule] = useDeleteDoctorScheduleMutation();
  const { data, isLoading } = useGetAllDoctorScheduleQuery({ ...query });
  const schedules = data?.doctorSchedule;
  console.log(schedules)
  const meta = data?.meta;
  let pageCount: number;


  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  useEffect(() => {
    const updateData = schedules?.map((schedule: any, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDateTime),
        startTime: dayjs(schedule?.schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
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
          <IconButton aria-label="delete">
            <DeleteIcon
              onClick={() => handleDelete(row.id)}
              sx={{ color: "red" }}
            />
          </IconButton>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();

      if (res?.doctorId) {
        toast.success("Schedule deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)} endIcon={<AddIcon />}>Create My Schedule</Button>
        <DoctorScheduleModel
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Stack>

      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={allSchedule ?? []}
            columns={columns}
            hideFooterPagination
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      ) : (
        <div className="min-h-[calc(100vh-160px)] grid place-items-center">
          <div className=" w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
        </div>
      )}
    </Box>
  );
};
export default SchedulesPage;
