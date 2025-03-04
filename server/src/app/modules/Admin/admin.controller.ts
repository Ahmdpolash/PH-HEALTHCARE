import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sentResponse";
import httpStatus from "http-status";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getByIdFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.getByIdFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched by id!",
    data: result,
  });
};

const deleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.deleteFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data deleted!",
    data: result,
  });
};

const updateIntoDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.updateIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.softDeleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
};

export const AdminControllers = {
  getAllAdmin,
  getByIdFromDb,
  deleteFromDb,
  updateIntoDb,
  softDeleteFromDB,
};
