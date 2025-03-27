import { NextFunction, Request, Response, Router } from "express";
import { SpecialitiesControllers } from "./specialities.controller";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";
import { SpecialtiesValidtaion } from "./specialities.validation";
import { UserRole } from "@prisma/client";
import { auth } from "../../middleware/auth";

const router = Router();

// get specialties route
router.get("/", SpecialitiesControllers.getSpecialities);

// create specialties route
router.post(
  "/create-specialites",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    return SpecialitiesControllers.createSpecialities(req, res, next);
  }
);

// delete specialites
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SpecialitiesControllers.deleteSpecialities
);

export const SpecialitiesRoutes = router;
