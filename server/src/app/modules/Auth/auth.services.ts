import prisma from "../../../shared/prisma";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helper/jwtHelper";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import ApiError from "../../error/ApiError";

import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { emailSender } from "../../utils/emailSender";

// login
const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not Found!");
  }

  // check valid password
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

const changePassword = async (
  user: any,
  payload: { oldPassword: string; newPassword: string }
) => {
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
    status: httpStatus.OK,
    message: "Password changed successfully!",
  };
};

//forgot password

const forgotPassword = async (email: string) => {
  // find user
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  // generate a token
  const resetPasswordToken = await jwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.reset_password_token as Secret,
    config.reset_password_token_expiry as string
  );

  // send the token to the user's email

  const resetPassLink =
    config.reset_password_url +
    `?userId=${user.id}&token=${resetPasswordToken}`;

  emailSender(user.email, user.email, resetPassLink);
  return {
    status: httpStatus.OK,
    message: "Password reset link sent to your email",
  };
};

//reset password

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  // verify the token

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.reset_password_token as Secret
  );

  if (!isValidToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token!");
  }

  // hash the new password

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  // update the password

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    status: httpStatus.OK,
    message: "Password reset successfully!",
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
