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
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];


  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.user.findMany({
    where: whereConditons,
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
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      Patient: true,
      Doctor: true,
    },
    // include: {
    //   admin: true,
    //   Patient: true,
    //   Doctor: true,
    // },
  });

  const total = await prisma.user.count({
    where: whereConditons,
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
