import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminServices.getAllAdminFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDb: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.getByIdFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched by id!",
    data: result,
  });
});

const deleteFromDb: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.deleteFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data deleted!",
    data: result,
  });
});

const updateIntoDb: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.updateIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
});

const softDeleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.softDeleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getByIdFromDb,
  deleteFromDb,
  updateIntoDb,
  softDeleteFromDB,
};
