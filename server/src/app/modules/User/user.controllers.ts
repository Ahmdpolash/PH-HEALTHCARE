import { Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import { userSearchAbleFields } from "./user.constant";
import pick from "../../../shared/pick";

//GET ALL USERS
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userSearchAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await userServices.getAllUsersFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

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
  getAllUsers,
};
