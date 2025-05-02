"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h1 className="mb-3 text-2xl lg:text-4xl font-bold tracking-wide cursor-pointer">
          <span className="text-blue-500 ">Doc</span>Time
        </h1>

        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography>Health Plans</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>Order Medicine</Typography>
          <Typography component={Link} href="/doctors">
            Doctors
          </Typography>
          {userInfo?.email ? (
            <Typography component={Link} href="/dashboard">
              Dashboard
            </Typography>
          ) : null}
        </Stack>

        {userInfo?.email ? (
          <Button color="error" onClick={handleLogOut}>
            Logout
          </Button>
        ) : (
          <Button component={Link} href="/login">
            Login
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
