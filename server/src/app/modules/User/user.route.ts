import { Request, Response, Router } from "express";
import { userControllers } from "./user.controllers";
import { AdminControllers } from "../Admin/admin.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create-admin", auth("ADMIN"), userControllers.createAdmin);

router.get("/admin", AdminControllers.getAllAdmin);

export const UserRoutes = router;
