import { Request, Response } from "express";

import httpStatus from "http-status";
import sendResponse from "../../../shared/sentResponse";
import { catchAsync } from "../../../shared/catchAsync";
import { IAuthUser } from "../../interface/common";
import { MetaService } from "./meta.service";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaService.fetchDashboardMetaData(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data retrival successfully!",
      data: result,
    });
  }
);

export const MetaController= { fetchDashboardMetaData };
