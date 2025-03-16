import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controllers";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";
import { userValidationSchemas } from "./user.validations";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

// get all users route

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.getAllUsersFromDb
);

// create-admin route
router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchemas.createAdmin.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createAdmin(req, res, next);
  }
);

//create doctor route

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchemas.createDoctor.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createDoctor(req, res, next);
  }
);

//create doctor route

router.post(
  "/create-patient",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidationSchemas.createPatient.parse(
      JSON.parse(req.body.data)
    );
    return userControllers.createPatient(req, res, next);
  }
);

// change profile status
router.patch(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidationSchemas.updateProfileStatus),
  userControllers.changeProfileStatus
);

//get my profile route
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  userControllers.getMyProfile
);

export const UserRoutes = router;
