import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import { access } from "fs";

dotenv.config();

export const createToken = async ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRETKEY as string, {
    expiresIn: "2h",
  });
};

export interface IReqAccessToken extends Request {
  payload: any;
  headers: {
    accesstoken: string;
  };
}

export const tokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { accesstoken } = req.headers;
    console.log(accesstoken);
    if (!accesstoken) throw new Error("Token Must Provided!");

    const decodedPayload = jwt.verify(
      accesstoken as string,
      process.env.JWT_SECRETKEY as string
    );

    console.log(decodedPayload);
    reqToken.payload = decodedPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export const uidDecoding = (token: string | string[]) => {
  return jwt.verify(token as string, process.env.JWT_SECRETKEY as string);
};
