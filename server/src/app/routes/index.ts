import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { SpecialitiesRoutes } from "../modules/Specialities/specialities.route";
import { DoctorRouters } from "../modules/Doctor/doctor.route";
import { PatientRoutes } from "../modules/Patient/patient.route";
import { ScheduleRoutes } from "../modules/Schedule/schedule.route";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/doctorSchedule.route";
import { AppointmentRoutes } from "../modules/Appoinment/appointment.route";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
import { PrescriptionRoutes } from "../modules/Prescriptoin/prescription.route";
import { ReviewRoutes } from "../modules/Review/review.route";
import { MetaRoutes } from "../modules/Meta/meta.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRouters,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialitiesRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/prescription",
    route: PrescriptionRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/meta",
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
