import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PHModal from "@/components/shared/PhModal";
import PhForm from "@/components/Forms/PhForm";
import { Grid } from "@mui/material";
import PHInput from "@/components/Forms/PhInput";
import { FieldValues } from "react-hook-form";
import FileUploader from "@/components/Forms/FileUploader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SpecialityModal = ({ open, setOpen }: TProps) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
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
