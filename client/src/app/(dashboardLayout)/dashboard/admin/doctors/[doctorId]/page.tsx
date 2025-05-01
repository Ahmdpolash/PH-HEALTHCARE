"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import PHModal from "@/components/shared/PhModal";
import PhForm from "@/components/Forms/PhForm";
import { Box, Grid, Typography } from "@mui/material";
import PHInput from "@/components/Forms/PhInput";
import { FieldValues } from "react-hook-form";
import FileUploader from "@/components/Forms/FileUploader";
import { modifyPayload } from "@/utils/ModifyPayload";
import { useCreateSpecialityMutation } from "@/redux/api/specialitiesApi";
import { toast } from "sonner";
import PHFullScreenModal from "@/components/shared/PhFullScreenModal";
import PHSelectField from "@/components/Forms/PhSelectField";
import { Gender } from "@/types";
import {
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { useRouter } from "next/navigation";

type TProps = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TProps) => {
  const router = useRouter();
  const id = params?.doctorId;
  const { data, isLoading } = useGetDoctorByIdQuery(id);

  const [updateDoctor] = useUpdateDoctorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.appointmentFee = Number(values.appointmentFee);
    values.id = id;
   
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor updated successfully!!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    appointmentFee: data?.appointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };

  


  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Doctor Info
      </Typography>

      {isLoading ? (
        "Loading..."
      ) : (
        <PhForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="contactNumber"
                type="text"
                label="Contact Number"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="address"
                type="text"
                label="Address"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="registrationNumber"
                type="text"
                label="Registration Number"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="experience"
                label="Experience (in years)"
                fullWidth={true}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHSelectField
                sx={{ mb: 2 }}
                items={Gender}
                name="gender"
                label="Gender"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="appointmentFee"
                label="Appointment Fee"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="qualification"
                label="Qualification"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                sx={{ mb: 2 }}
                name="designation"
                label="Designation"
                fullWidth={true}
              />
            </Grid>
          </Grid>

          <Button sx={{ mt: 2 }} type="submit">
            {isLoading ? "Updating..." : "Update Data"}
          </Button>
        </PhForm>
      )}
    </Box>
  );
};
export default DoctorUpdatePage;
