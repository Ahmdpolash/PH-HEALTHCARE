import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../utils/uploadImageOnCloudinary";

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

const getAllAdminFromDb = async () => {
  const result = await prisma.user.findMany();

  return result;
};

export const userServices = {
  createAdmin,
  getAllAdminFromDb,
};
