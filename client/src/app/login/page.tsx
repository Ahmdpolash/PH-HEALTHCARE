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
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/loginUser";
import { useRouter } from "next/navigation";
import { storedToken } from "@/services/auth.service";
import PhForm from "@/components/Forms/PhForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "@/components/Forms/PhInput";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  // submit handler
  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res.success) {
        storedToken(res?.data?.accessToken);
        toast.success(res.message);
        router.push("/dashboard");
      } else {
        setError(res.message);
        // toast.error(res.message);
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
                Patient Login
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          <Box mt={2}>
            <PhForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PHInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
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
            </PhForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
