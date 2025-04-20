import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import { AppointmentServices } from "./appointment.services";
import pick from "../../../shared/pick";
import { appointmentFilterableFields } from "./appointment.constant";

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

const getMyAppointment: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const filters = pick(req.query, ["status", "paymentStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AppointmentServices.getMyAppointment(
    user,
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Appointment retrived successfully!",
    data: result,
  });
});

const getAllAppointment: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AppointmentServices.getAllAppointment(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Appointment retrived successfully!",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
  getMyAppointment,
  getAllAppointment,
};
