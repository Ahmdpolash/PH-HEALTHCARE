import PHDatePicker from "@/components/Forms/PhDatePicker";
import PhForm from "@/components/Forms/PhForm";
import PHInput from "@/components/Forms/PhInput";
import PHModal from "@/components/shared/PhModal";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = async (values: FieldValues) => {
    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <PHModal open={open} setOpen={setOpen} title="Create Schedule">
        <PhForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ md: 12 }}>
              <PHDatePicker name="startDate" label="Start Date" />
            </Grid>
            <Grid size={{ md: 12 }}>
              <PHDatePicker name="endDate" label="End Date" />
            </Grid>
            <Grid size={{ md: 6 }}>
              {/* <PHTimePicker name="startTime" label="Start Time" /> */}
            </Grid>
            <Grid size={{ md: 6 }}>
              {/* <PHTimePicker name="endTime" label="End Time" /> */}
            </Grid>
          </Grid>

          <Button sx={{ mt: 2 }} type="submit">
            {/* {isLoading ? "Creating..." : "Create"} */}
            create
          </Button>
        </PhForm>
      </PHModal>
    </div>
  );
};
export default ScheduleModal;
