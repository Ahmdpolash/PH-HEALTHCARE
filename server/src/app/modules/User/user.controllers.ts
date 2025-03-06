import { Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import { catchAsync } from "../../../shared/catchAsync";

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createAdmin(req.body);

  res.status(200).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const getAllAdmin: RequestHandler = async (req, res) => {
  const result = await userServices.getAllAdminFromDb();

  res.send(result);
};

export const userControllers = {
  createAdmin,
  getAllAdmin,
};
