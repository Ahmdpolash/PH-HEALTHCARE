import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";

import { notFound } from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { AppointmentServices } from "./app/modules/Appoinment/appointment.services";
import cron from "node-cron";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// delete unpaid payment
cron.schedule("* * * * *", () => {
  try {
    AppointmentServices.cancelUnpaidAppointment();
  } catch (err) {
    console.error(err);
  }
});

//routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("PH HEALTHCARE IS RUNNING ");
});

// middleware

app.use(notFound);
app.use(globalErrorHandler);

export default app;
