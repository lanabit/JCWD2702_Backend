import { NextFunction, Request, Response } from "express";
import {
  createEmployeeService,
  updateLeaveRequest,
} from "../services/HRService";
import { HashPassword } from "../helpers/hashing";

export const approvalLeaveRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await updateLeaveRequest({ id: parseInt(id) });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { email, fullname, password, positionId, shiftId, address } = req.body;

    password = await HashPassword({ password });
    console.log("hashed pass: ", password);
    await createEmployeeService({
      email,
      fullname,
      positionId,
      shiftId,
      address,
      password,
    });

    res.status(201).send({
      error: false,
      message: "create employee success!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
