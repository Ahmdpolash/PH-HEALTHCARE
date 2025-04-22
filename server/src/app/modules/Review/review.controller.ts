import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";

import { ReviewServices } from "./review.services";

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

export const ReviewControllers = {
  createReview,
};
