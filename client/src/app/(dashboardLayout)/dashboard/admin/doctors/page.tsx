"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";

import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import { DoctorModal } from "../../_component/DoctorModal";
import {
  useDeleteDoctorMutation,
  useGetDoctorsQuery,
} from "@/redux/api/doctorApi";
import { useDebounced } from "@/redux/hook";
import Link from "next/link";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // search
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetDoctorsQuery({ ...query });

  // format data for datagrid
  const doctors = data?.doctors;
  const meta = data?.meta;

  const [deleteDoctor] = useDeleteDoctorMutation();

  // delete doctor
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success("Doctor deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "appointmentFee", headerName: "Appointment Fee", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/doctors/${row.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Doctor"
        />
      </Stack>

      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={doctors} columns={columns} />
        </Box>
      ) : (
        <div className="min-h-[calc(100vh-160px)] grid place-items-center">
          <div className=" w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
        </div>
      )}
    </Box>
  );
};
export default DoctorsPage;
