import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { DoctorControllers } from "./doctor.controller";

const router = Router();

router.get("/", DoctorControllers.getAllDoctorFromDb);

router.get("/:id", DoctorControllers.getByIdFromDb);

router.patch("/:id", DoctorControllers.updateDoctor);

router.delete("/:id", DoctorControllers.deleteById);

router.delete("/soft/:id", DoctorControllers.softDeleteById);

export const DoctorRouters = router;
