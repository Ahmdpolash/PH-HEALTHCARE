import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { DoctorControllers } from "./doctor.controller";

const router = Router();

router.get("/", DoctorControllers.getAllDoctorFromDb);

router.get("/:id", DoctorControllers.getByIdFromDb);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  DoctorControllers.updateDoctor
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorControllers.deleteById
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorControllers.softDeleteById
);

export const DoctorRouters = router;
