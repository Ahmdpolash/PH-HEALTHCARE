import { Router } from "express";

import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { ReviewControllers } from "./review.controller";

const router = Router();

// create review route
router.post(
  "/",
  auth(UserRole.PATIENT),
  // validateRequest(PrescriptionValidation.create),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
