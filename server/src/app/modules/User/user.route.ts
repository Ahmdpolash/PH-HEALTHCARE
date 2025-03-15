import { Request, Response, Router } from "express";
import { userControllers } from "./user.controllers";
import { AdminControllers } from "../Admin/admin.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";

const router = Router();

router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userControllers.createAdmin
);

router.get("/admin", AdminControllers.getAllAdmin);

export const UserRoutes = router;
