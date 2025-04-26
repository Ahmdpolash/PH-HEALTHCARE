import { getUserInfo, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const user = getUserInfo();
  const handleLogOut = () => {
    removeUser();
    router.refresh();
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
