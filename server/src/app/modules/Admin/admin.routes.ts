import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { adminValidationSchemas } from "./admin.validatons";

const router = Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getByIdFromDb);

router.delete("/:id", AdminControllers.deleteFromDb);

router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminControllers.updateIntoDb
);

router.delete("/:id", AdminControllers.deleteFromDb);

router.delete("/soft/:id", AdminControllers.softDeleteFromDB);

export const AdminRoutes = router;
