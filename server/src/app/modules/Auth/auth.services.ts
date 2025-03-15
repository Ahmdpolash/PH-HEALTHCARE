import prisma from "../../../shared/prisma";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helper/jwtHelper";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import ApiError from "../../error/ApiError";

import httpStatus from "http-status";

// login
const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
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
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_refresh_secret as string,
    config.jwt.jwt_refresh_epires_in as string
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
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as string
    );
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

//change password

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  // check if the old password is correct
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password incorrect!");
  }

  // hash the new password
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  // update the user's password in the database
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

export const AuthServices = { loginUser, refreshToken, changePassword };
