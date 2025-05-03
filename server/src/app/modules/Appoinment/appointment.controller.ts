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
    meta: result.meta,
    data: result.data,
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
    meta: result.meta,
    data: result,
  });
});

const changeAppointmentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = req.user;
  const result = await AppointmentServices.changeAppointmentStatus(
    id,
    status,
    user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment status changed successfully!",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
  getMyAppointment,
  getAllAppointment,
  changeAppointmentStatus,
};
