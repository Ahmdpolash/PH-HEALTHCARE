import { Router } from "express";

import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { ReviewControllers } from "./review.controller";
import { ReviewValidation } from "./review.validation";
import validateRequest from "../../middleware/validateRequest";

const router = Router();
router.get("/", ReviewControllers.getAllFromDB);

// create review route
router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(ReviewValidation.create),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
