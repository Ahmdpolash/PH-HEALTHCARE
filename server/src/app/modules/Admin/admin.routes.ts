import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { adminValidationSchemas } from "./admin.validatons";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminControllers.getAllAdmin
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  AdminControllers.getByIdFromDb
);

router.delete(
  "/:id",

  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  AdminControllers.deleteFromDb
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  validateRequest(adminValidationSchemas.update),
  AdminControllers.updateIntoDb
);

router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  AdminControllers.softDeleteFromDB
);

export const AdminRoutes = router;
