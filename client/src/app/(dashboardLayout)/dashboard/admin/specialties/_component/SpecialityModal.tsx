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

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SpecialityModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      
    } catch (error:any) {
      console.log(error.message)
    }


  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <PhForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }}>
            <PHInput sx={{ width: "100%" }} name="title" label="Title" />
          </Grid>

          <Grid size={{ md: 6 }}>
            <FileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>

        <Button sx={{ mt: 2 }} type="submit">
          Create
        </Button>
      </PhForm>
    </PHModal>
  );
};
