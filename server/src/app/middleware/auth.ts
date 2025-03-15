import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { jwtHelpers } from "../../helper/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

export const auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if the token is sent from client

    if (!token) {
      throw new Error("you are not authorized");
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_access_secret as Secret
    );

    if (!roles.length && !roles.includes(verifiedUser.role)) {
      throw new Error("you are not authorized");
    }

    next();
  });
};
