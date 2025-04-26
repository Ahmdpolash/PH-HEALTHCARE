"use client";
import assets from "@/assets";
import { registerPatient } from "@/services/actions/registerPatient";
import { modifyPayload } from "@/utils/ModifyPayload";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type IPatientData = {
  name: string;
  email: string;
  password: string;
  address: string;
  contactNumber: string;
};

interface IPatientRegisterFormData {
  password: string;
  patient: IPatientData;
}

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatientRegisterFormData>();

  const onSubmit: SubmitHandler<IPatientRegisterFormData> = async (values) => {
    const data = modifyPayload(values);

    const res = await registerPatient(data);

    try {
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            padding: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Link className="cursor-pointer" href="/">
                <Image
                  src={assets.svgs.logo}
                  width={50}
                  height={50}
                  alt="logo"
                />
              </Link>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box mt={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid size={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.name", { required: true })}
                  />
                  {errors?.patient?.name && (
                    <span className="grid text-start text-red-500">
                      Name is Required
                    </span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    type="email"
                    fullWidth={true}
                    {...register("patient.email", { required: true })}
                  />
                  {errors?.patient?.email && (
                    <span className="grid text-start text-red-500">
                      Email is Required
                    </span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("password", { required: true })}
                  />
                  {errors?.patient?.password && (
                    <span className="grid text-start text-red-500">
                      Password is Required
                    </span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.contactNumber")}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.address")}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "13px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
