"use client";
import assets from "@/assets";
import PhForm from "@/components/Forms/PhForm";
import PHInput from "@/components/Forms/PhInput";
import { userLogin } from "@/services/actions/loginUser";
import { registerPatient } from "@/services/actions/registerPatient";
import { storedToken } from "@/services/auth.service";
import { modifyPayload } from "@/utils/ModifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
 
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

import { toast } from "sonner";
import { z } from "zod";

export const patientValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  address: z.string().min(1, "Please enter your address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  patient: patientValidationSchema,
});

export const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const Register = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    // make the values in formdata
    const data = modifyPayload(values);

    const res = await registerPatient(data);

    try {
      if (res?.success) {
        if (res?.data?.id) {
          toast.success(res?.message);
          const result = await userLogin({
            password: values.password,
            email: values.patient.email,
          });
          if (result?.data?.accessToken) {
            storedToken(result?.data?.accessToken);
            router.push("/");
          }
        }
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
            <PhForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={12}>
                  <PHInput label="Name" fullWidth={true} name="patient.name" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PHInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PHInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PHInput
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PHInput
                    label="Address"
                    fullWidth={true}
                    name="patient.address"
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
            </PhForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
