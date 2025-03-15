import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controllers";
import { AdminControllers } from "../Admin/admin.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";
import { userValidationSchemas } from "./user.validations";

const router = Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchemas.createAdmin.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createAdmin(req, res, next);
  }
);

router.get("/admin", AdminControllers.getAllAdmin);

export const UserRoutes = router;
