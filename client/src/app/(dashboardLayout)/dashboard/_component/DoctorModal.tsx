import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import PHModal from "@/components/shared/PhModal";
import PhForm from "@/components/Forms/PhForm";
import { Grid } from "@mui/material";
import PHInput from "@/components/Forms/PhInput";
import { FieldValues } from "react-hook-form";
import FileUploader from "@/components/Forms/FileUploader";
import { modifyPayload } from "@/utils/ModifyPayload";
import { useCreateSpecialityMutation } from "@/redux/api/specialitiesApi";
import { toast } from "sonner";
import PHFullScreenModal from "@/components/shared/PhFullScreenModal";
import PHSelectField from "@/components/Forms/PhSelectField";
import { Gender } from "@/types";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
    const data = modifyPayload(values);

    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor created successfully!!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      appointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };

  return (
    <PHFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create A New Doctor"
    >
      <PhForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.name"
              label="Name"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.email"
              label="Email"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.contactNumber"
              type="text"
              label="Contact Number"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.address"
              type="text"
              label="Address"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.registrationNumber"
              type="text"
              label="Registration Number"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.experience"
              label="Experience (in years)"
              fullWidth={true}
            />
          </Grid>

          {/* need to change It */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHSelectField
              sx={{ mb: 2 }}
              items={Gender}
              name="doctor.gender"
              label="Gender"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.appointmentFee"
              label="Appointment Fee"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              sx={{ mb: 2 }}
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
            />
          </Grid>
        </Grid>

        <Button sx={{ mt: 2 }} type="submit">
          {isLoading ? "Creating..." : "Create a Doctor"}
        </Button>
      </PhForm>
    </PHFullScreenModal>
  );
};
