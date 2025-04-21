import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import { PrescriptionServices } from "./prescription.services";





const createPrescription: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await PrescriptionServices.createPrescipton(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription created successfully!",
    data: result,
  });
});

export const PrescriptionControllers = {
  createPrescription,
};
