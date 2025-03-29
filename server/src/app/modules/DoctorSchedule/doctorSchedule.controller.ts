import { Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import { IAuthUser } from "../../interface/common";
import httpStatus from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import pick from "../../../shared/pick";
import { scheduleFilterableFields } from "./doctorSchedule.constant";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await DoctorScheduleService.insertIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  }
);

// get doctor schedule

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, scheduleFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await DoctorScheduleService.getMySchedule(
      filters,
      options,
      user
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Schedule retrieved successfully",
      data: result,
    });
  }
);
const getMySchedule: RequestHandler = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, scheduleFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await DoctorScheduleService.getMySchedule(
      filters,
      options,
      user
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedule retrieved successfully",
      data: result,
    });
  }
);

// delete

const deleteFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const { id } = req.params;
    const user = req.user;

    const result = await DoctorScheduleService.deleteFromDB(
      user as IAuthUser,
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Schedule deleted successfully!",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  insertIntoDB,
  getMySchedule,
  deleteFromDB,
  getAllFromDB,
};
