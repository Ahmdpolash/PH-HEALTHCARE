import { Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "../../../shared/prisma";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";
import { Request } from "express";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../helper/paginationHelper";
import { userSearchAbleFields } from "./user.constant";

//GET ALL USERS
const getAllUsersFromDb = async (params: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//CREATE ADMIN
const createAdmin = async (req: Request) => {
  // upload image to cloudinary
  const file = req.file;

  if (file) {
    // const imageName = `${req.body.admin.name } ;
    const uploadImageToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadImageToCloudinary?.secure_url;
  }

  // hashed the password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: userData,
    });

    const createdAdmin = await trx.admin.create({
      data: req.body.admin,
    });

    return createdAdmin;
  });

  return result;
};

//CREATE DOCTOR
const createDoctor = async (req: Request) => {
  //upload image

  const file = req.file;

  if (file) {
    const uploadImageOnCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadImageOnCloudinary?.secure_url;
  }

  // hashed password

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: userData,
    });

    const createDoctor = await trx.doctor.create({
      data: req.body.doctor,
    });

    return createDoctor;
  });

  return result;
};

//CREATE PATIENT
const createPatient = async (req: Request) => {
  //upload image

  const file = req.file;

  if (file) {
    const uploadImageOnCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadImageOnCloudinary?.secure_url;
  }
  //hashed password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: userData,
    });

    const createPatient = await trx.patient.create({
      data: req.body.patient,
    });

    return createPatient;
  });

  return result;
};

export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsersFromDb,
};
