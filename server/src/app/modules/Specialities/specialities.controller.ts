import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { SpecialitiesService } from "./specialities.service";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";


// CREATE SPECIALITIES
const createSpecialities: RequestHandler = catchAsync(async (req, res) => {
  const result = await SpecialitiesService.createSpecialities(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

// GET ALL SPECAIALITEIS
const getSpecialities: RequestHandler = catchAsync(async (req, res) => {
  const result = await SpecialitiesService.getSpecialities();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties fetched successfully!",
    data: result,
  });
});

export const SpecialitiesControllers = {
  createSpecialities,
  getSpecialities,
};
