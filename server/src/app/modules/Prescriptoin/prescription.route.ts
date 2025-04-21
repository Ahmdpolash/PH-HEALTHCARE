import { Router } from "express";
import { PrescriptionControllers } from "./prescription.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { PrescriptionValidation } from "./prescription.validation";

const router = Router();

// get appointment route
router.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionControllers.patientPrescription
);

// create appointment route
router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(PrescriptionValidation.create),
  PrescriptionControllers.createPrescription
);

export const PrescriptionRoutes = router;
