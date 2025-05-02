"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import PhForm from "@/components/Forms/PhForm";
import PHInput from "@/components/Forms/PhInput";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResetPasswordMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authKey } from "@/constants/authKey";
import { logoutUser } from "@/services/actions/logoutUser";
import { deleteCookies } from "@/services/actions/deleteCookies";

const validationSchema = z.object({
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});

const page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("userId");
  const token = params.get("token");

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(authKey, token);
  }, []);

  const onSubmit = async (values: FieldValues) => {
    const updateData = { ...values, id };

    const res = await resetPassword(updateData);
    if (res.data.status === 200) {
      toast.success(res.data.message);
      localStorage.removeItem(authKey);
      deleteCookies([authKey, "refreshToken"]);
      router.push("/login");
    } else {
      throw new Error("Something Went Wrong, Try Again");
    }
    console.log(res);
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
        mt: { xs: 2, md: 10 },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            "& svg": {
              width: 100,
              height: 100,
            },
          }}
        >
          <KeyIcon sx={{ color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Reset password
        </Typography>
      </Stack>
      <PhForm
        onSubmit={onSubmit}
        defaultValues={{ newPassword: "" }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <PHInput
              name="newPassword"
              type="password"
              label="New Password"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          Reset Password
        </Button>
      </PhForm>
    </Box>
  );
};
export default page;
