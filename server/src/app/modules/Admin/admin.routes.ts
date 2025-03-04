import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getByIdFromDb);

router.delete("/:id", AdminControllers.deleteFromDb);


router.delete("/:id", AdminControllers.deleteFromDb);


export const AdminRoutes = router;
