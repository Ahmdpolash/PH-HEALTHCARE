import PHDatePicker from "@/components/Forms/PhDatePicker";
import PhForm from "@/components/Forms/PhForm";
import PHInput from "@/components/Forms/PhInput";
import PHTimePicker from "@/components/Forms/PhTimePicker";
import PHModal from "@/components/shared/PhModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);

    try {
      const res = await createSchedule(values).unwrap();
      console.log(res);
      if (res?.length) {
        toast.success("Schedule created successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <PHModal open={open} setOpen={setOpen} title="Create Schedule">
        <PhForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2} sx={{ width: "400px" }}>
            <Grid size={{ md: 12 }}>
              <PHDatePicker name="startDate" label="Start Date" />
            </Grid>
            <Grid size={{ md: 12 }}>
              <PHDatePicker name="endDate" label="End Date" />
            </Grid>
            <Grid size={{ md: 6 }}>
              <PHTimePicker name="startTime" label="Start Time" />
            </Grid>
            <Grid size={{ md: 6 }}>
              <PHTimePicker name="endTime" label="End Time" />
            </Grid>
          </Grid>

          <Button sx={{ mt: 2 }} type="submit">
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </PhForm>
      </PHModal>
    </div>
  );
};
export default ScheduleModal;
