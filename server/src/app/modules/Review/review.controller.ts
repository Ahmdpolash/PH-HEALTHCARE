import { Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";

import { ReviewServices } from "./review.services";
import pick from "../../../shared/pick";
import { reviewFilterableFields } from "./review.constant";

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ReviewServices.createReview(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewServices.getAllFromDB(filters, options);



  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewControllers = {
  createReview,
  getAllFromDB,
};
