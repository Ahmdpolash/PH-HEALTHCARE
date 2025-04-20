import { Router } from "express";
import { AppointmentControllers } from "./appointment.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// get my appointment route
router.get(
  "/my-appointment",
  auth(UserRole.PATIENT,UserRole.DOCTOR),
  AppointmentControllers.getMyAppointment
);

// create appointment route
router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentControllers.createAppointment
);

export const AppointmentRoutes = router;
