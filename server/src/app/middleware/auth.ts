import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { jwtHelpers } from "../../helper/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../error/ApiError";
import httpStatus from "http-status";

export const auth = (...roles: string[]) => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      try {
        const token = req.headers.authorization;
        //check if the token is sent from client

        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        const verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.jwt_access_secret as Secret
        );

        req.user = verifiedUser;

        if (!roles.length && !roles.includes(verifiedUser.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
        }

        

        next();
      } catch (error) {
        next(error);
      }
    }
  );
};
