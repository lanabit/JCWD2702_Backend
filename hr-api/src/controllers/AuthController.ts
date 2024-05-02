import { NextFunction, Request, Response } from "express";
import { findEmployeeByEmail } from "../services/AuthService";
import { comparePassword } from "../helpers/hashing";
import { createToken } from "../helpers/token";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const loginResult = await findEmployeeByEmail({ email });

    const passwordComparationResult = await comparePassword({
      passwordClient: password,
      passwordDb: loginResult.password,
    });

    if (!passwordComparationResult) throw new Error("Wrong password");

    const accessToken = await createToken({ uid: loginResult.uid });
    res.status(201).send({
      error: false,
      message: "Login success",
      data: {
        accesstoken: accessToken,
        fullname: loginResult.fullname,
        imageUrl: loginResult.EmployeeProfile?.EmployeeImagesProfile[0].url,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
