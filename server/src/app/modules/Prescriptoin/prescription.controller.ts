import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import { PrescriptionServices } from "./prescription.services";
import pick from "../../../shared/pick";
import { prescriptionFilterableFields } from "./prescription.constant";

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

const patientPrescription = catchAsync(async (req, res) => {
  const user = req.user;
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const filters = pick(req.query, prescriptionFilterableFields);

  const result = await PrescriptionServices.patientPrescription(user, options,filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription retrived successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const PrescriptionControllers = {
  createPrescription,
  patientPrescription,
};
