import { Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";

import sendResponse from "../../../shared/sentResponse";
import { catchAsync } from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interface/common";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.inserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

// get schedule

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await ScheduleService.getAllFromDB(filters, options, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule retrieved successfully",
      data: result,
    });
  }
);

// get schedule by id

const getScheduleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleService.getScheduleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule retrieved successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleService.getScheduleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule delete successfully",
    data: result,
  });
});

export const ScheduleController = {
  inserIntoDB,
  getAllFromDB,
  getScheduleById,
  deleteFromDB,
};
