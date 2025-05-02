import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const user = getUserInfo();

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <div>
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
    </div>
  );
};

export default AuthButton;
