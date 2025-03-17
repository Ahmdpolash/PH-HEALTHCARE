import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { DoctorServices } from "./doctor.service";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { doctorFilterableFields } from "./doctor.constant";

// GET ALL DOCTORS
const getAllDoctorFromDb: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await DoctorServices.getAllDoctorFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// GET SINGLE

const getByIdFromDb: RequestHandler = catchAsync(async (req, res) => {
  const result = await DoctorServices.getByIdFromDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "doctor retrieved successfully!",
    data: result,
  });
});

// DELETE

const deleteById: RequestHandler = catchAsync(async (req, res) => {
  const result = await DoctorServices.deleteById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "doctor deleted successfully!",
    data: result,
  });
});

// SOFT DELETE

const softDeleteById = catchAsync(async (req, res) => {
  const result = await DoctorServices.softDeleteById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "doctor  deleted successfully!",
    data: result,
  });
});
export const DoctorControllers = {
  getAllDoctorFromDb,
  getByIdFromDb,
  deleteById,
  softDeleteById,
};
