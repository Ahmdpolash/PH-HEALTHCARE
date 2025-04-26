"use client";
import { getUserInfo, isLoggedIn, removeUser } from "@/services/auth.service";
import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = getUserInfo();
  const router = useRouter();
  // console.log(user);

  const handleLogOut = () => {
    removeUser();
    router.refresh();
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
          <Typography>NGOs</Typography>
        </Stack>

        {!user ? (
          <>
            <Button component={Link} href="/login">
              Login
            </Button>
          </>
        ) : (
          <>
            <Button color="error" onClick={handleLogOut}>
              Logout
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
