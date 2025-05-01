import PhForm from "@/components/Forms/PhForm";
import PHInput from "@/components/Forms/PhInput";
import PHSelectField from "@/components/Forms/PhSelectField";
import PHFullScreenModal from "@/components/shared/PhFullScreenModal";
import {
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { useGetSpecialityQuery } from "@/redux/api/specialitiesApi";
import { Gender } from "@/types";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import MultipleSelectChip from "../../../_component/MultiChip";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};
const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
  const { data, isLoading, refetch, isSuccess } = useGetDoctorByIdQuery(id);

  const { data: allSpecialties } = useGetSpecialityQuery(undefined);
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();
  useEffect(() => {
    if (!isSuccess) return;

    setSelectedSpecialtiesIds(
      data?.doctorSpecialities?.map((sp: any) => {
        return sp.specialitiesId;
      })
    );
  }, [isSuccess]);

  const handleFormSubmit = async (values: FieldValues) => {
    const doctorSpecialities = selectedSpecialtiesIds.map(
      (specialitiesId: string) => ({
        specialitiesId,
        isDeleted: false,
      })
    );

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "DoctorSchedules",
      "specialties",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    updatedValues.doctorSpecialities = doctorSpecialities;

    updatedValues.experience = Number(values.experience);
    updatedValues.appointmentFee = Number(values.appointmentFee);
    values.id = id;

    try {
      const res = await updateDoctor({ body: updatedValues, id });
      if (res?.data) {
        toast.success("Profile updated successfully");
      }
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <PhForm onSubmit={handleFormSubmit} defaultValues={data}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput name="name" label="Name" fullWidth={true} sx={{ mb: 2 }} />
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
              type="number"
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
              type="number"
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
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <MultipleSelectChip
              allSpecialties={allSpecialties}
              selectedIds={selectedSpecialtiesIds}
              setSelectedIds={setSelectedSpecialtiesIds}
            />
          </Grid>
        </Grid>

        <Button sx={{ mt: 2 }} type="submit" disabled={updating}>
          {isLoading ? "Updating..." : "Update Data"}
        </Button>
      </PhForm>
    </PHFullScreenModal>
  );
};
export default ProfileUpdateModal;
