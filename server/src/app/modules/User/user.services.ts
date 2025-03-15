import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "../../../shared/prisma";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";

//CREATE ADMIN
const createAdmin = async (req: any) => {
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
const createDoctor = async (req: any) => {
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
const createPatient = async (req: any) => {
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
};
