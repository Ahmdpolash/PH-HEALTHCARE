import { Router } from "express";
import { AppointmentControllers } from "./appointment.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// create schedule route
router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentControllers.createAppointment
);

export const AppointmentRoutes = router;
