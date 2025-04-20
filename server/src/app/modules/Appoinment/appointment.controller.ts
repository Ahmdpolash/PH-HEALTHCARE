import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import { AppointmentServices } from "./appointment.services";

const createAppointment: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await AppointmentServices.createAppointment(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment created successfully!",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
};
