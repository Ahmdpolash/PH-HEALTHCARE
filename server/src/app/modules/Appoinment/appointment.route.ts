import { Router } from "express";
import { AppointmentControllers } from "./appointment.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { AppointmentValidation } from "./appointment.validation";

const router = Router();

// get all appointment route
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AppointmentControllers.getAllAppointment
);

// get my appointment route
router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentControllers.getMyAppointment
);

// create appointment route
router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(AppointmentValidation.createAppointment),
  AppointmentControllers.createAppointment
);

export const AppointmentRoutes = router;
