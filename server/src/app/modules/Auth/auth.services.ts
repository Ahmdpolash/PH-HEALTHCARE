import { error } from "console";
import prisma from "../../../shared/prisma";
import { TLoginUser } from "./auth.interface";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const accesToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghgijklmnop",
    {
      expiresIn: "15m",
    }
  );

  return { userData, accesToken };
};

export const AuthServices = { loginUser };
