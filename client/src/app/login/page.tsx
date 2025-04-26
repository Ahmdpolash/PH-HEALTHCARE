"use client";
import assets from "@/assets";
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
import { useForm, SubmitHandler } from "react-hook-form";

import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/loginUser";
import { useRouter } from "next/navigation";
import { storedToken } from "@/services/auth.service";
export type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin(data);

      if (res.success) {
        storedToken(res?.data?.accessToken);
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
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
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Login
              </Typography>
            </Box>
          </Stack>

          <Box mt={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("email")}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("password")}
                  />
                </Grid>
              </Grid>{" "}
              <Link
                href="/forgot-password"
                className="text-right cursor-pointer grid place-content-right"
              >
                Forgot Password?
              </Link>
              <Button
                sx={{
                  margin: "13px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account ?
                <Link href="/register" className="no-underline">
                  {" "}
                  Create An Account
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
