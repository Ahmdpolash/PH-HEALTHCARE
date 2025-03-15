import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/login", AuthControllers.loginUser);

router.post("/refresh-token", AuthControllers.refreshToken);

router.post("/change-password",auth(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.DOCTOR,UserRole.PATIENT), AuthControllers.changePassword);

export const AuthRoutes = router;
