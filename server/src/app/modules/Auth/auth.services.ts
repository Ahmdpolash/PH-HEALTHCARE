import { error } from "console";
import prisma from "../../../shared/prisma";
import { TLoginUser } from "./auth.interface";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../../helper/jwtHelper";

const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  // access token generation

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    "abcdefg",
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    "abcdefghgijklmnop",
    "30d"
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needPasswordChange,
  };
};

// refresh token

const refreshToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = jwtHelpers.verifyToken(token, "abcdefghgijklmnop");
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    "abcdefg",
    "5m"
  );

  return {
    accessToken,
  };
};

export const AuthServices = { loginUser, refreshToken };
