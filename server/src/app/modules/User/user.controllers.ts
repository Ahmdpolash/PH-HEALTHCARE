import { Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";

import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

//GET ALL USERS
const getAllUsersFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userServices.getAllUsersFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
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

//CHANGE PROFLE STATUS
const changeProfileStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userServices.changeProfileStatus(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile status changed successfully!",
      data: result,
    });
  }
);

//GET MY PROFILE
const getMyProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await userServices.getMyProfile(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile fetched successfully!",
      data: result,
    });
  }
);

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsersFromDb,
  changeProfileStatus,
  getMyProfile,
};
