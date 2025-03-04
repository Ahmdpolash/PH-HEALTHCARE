import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getByIdFromDb);

router.delete("/:id", AdminControllers.deleteFromDb);

router.patch("/:id", AdminControllers.updateIntoDb);

router.delete("/:id", AdminControllers.deleteFromDb);

router.delete('/soft/:id', AdminControllers.softDeleteFromDB);

export const AdminRoutes = router;
