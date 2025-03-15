import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sentResponse";
import { AuthServices } from "./auth.services";

import httpStatus from "http-status";

// login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, needsPasswordChange, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

// refresh token

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "access token generated successfully",
    data: result,
  });
});

// change token

const changePassword = catchAsync(async (req, res) => {
  const user = req.user

  const result = await AuthServices.changePassword(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Changed Successfully",
    data: result,
  });
});

export const AuthControllers = { loginUser, refreshToken, changePassword };
