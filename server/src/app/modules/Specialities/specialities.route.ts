import { NextFunction, Request, Response, Router } from "express";
import { SpecialitiesControllers } from "./specialities.controller";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";
import { SpecialtiesValidtaion } from "./specialities.validation";

const router = Router();

// get specialties route
router.get("/", SpecialitiesControllers.getSpecialities);

// create specialties route
router.post(
  "/create-specialites",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data));
    return SpecialitiesControllers.createSpecialities(req, res, next);
  }
);

export const SpecialitiesRoutes = router;
