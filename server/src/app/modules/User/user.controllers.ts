import { Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
//CREATE ADMIN
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createAdmin(req);

  res.status(200).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

//CREATE DOCTOR

const createDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userServices.createDoctor(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Created successfuly!",
      data: result,
    });
  }
);
//CREATE PATIENT

const createPatient: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userServices.createPatient(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Patient Created successfuly!",
      data: result,
    });
  }
);

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
};
