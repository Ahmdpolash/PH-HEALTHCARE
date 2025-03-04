import { Request, Response, Router } from "express";
import { userControllers } from "./user.controllers";
import { AdminControllers } from "../Admin/admin.controller";

const router = Router();

router.post("/create-admin", userControllers.createAdmin)
router.get("/admin", AdminControllers.getAllAdmin)


export const userRoutes = router