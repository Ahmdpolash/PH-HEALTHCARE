import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import prisma from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: userData,
    });

    const createdAdmin = await trx.admin.create({
      data: data.admin,
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
