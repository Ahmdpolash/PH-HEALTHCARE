import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllAdminFromDb(filters, options);

    res.status(200).json({
      success: true,
      message: "Admin data retrieved successfully",
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

  res.status(200).json({
    success: true,
    message: "Admin data fetched by id!",
    data: result,
  });
};


const deleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.deleteFromDb(id);

  res.status(200).json({
    success: true,
    message: "Admin data deleted by id!",
    data: result,
  });
};

export const AdminControllers = { getAllAdmin,getByIdFromDb ,deleteFromDb};
