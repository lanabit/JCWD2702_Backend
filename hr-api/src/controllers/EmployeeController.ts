import { NextFunction, Request, Response } from "express";
import {
  getEmployees,
  getEmployeeById,
  createAttendanceClockIn,
  createAttendanceClockOut,
  createLeaveRequestService,
  getPosition,
  getShift,
  createProfileAndImagesProfile,
  updateProfileAndImages,
} from "../services/EmployeeService";
import { error } from "console";
import { IReqAccessToken, uidDecoding } from "../helpers/token";
import {
  deleteUploads,
  deleteUploadsfromUpdate,
} from "../helpers/deleteUploadedFiles";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees = await getEmployees();
    res.status(200).send(employees);
  } catch (error: any) {
    next(error);
  }
};

export const clockin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { employeeid } = req.headers;
    if (!employeeid) throw new Error("please send with header");
    const uid = uidDecoding(employeeid);
    await createAttendanceClockIn(uid);
    res.status(201).send({
      error: false,
      message: "clock in success!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const clockout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.body.id;
    await createAttendanceClockOut(id);
    res.status(201).send({
      error: false,
      message: "clock out success!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const leaveRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;
    let { employeeid } = req.headers;
    await createLeaveRequestService({ startDate, endDate, employeeid });

    res.status(201).send({
      error: false,
      message: "Leave Request Success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const employeePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findEmployeePosition = await getPosition();

    res.status(200).send({
      error: false,
      message: "Get Employee Position Success!",
      data: findEmployeePosition,
    });
  } catch (error) {
    next(error);
  }
};

export const employeeShiftandPosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findEmployeeShift = await getShift();
    const findEmployeePosition = await getPosition();

    res.status(200).send({
      error: false,
      message: "Get Employee Position Success!",
      data: { findEmployeeShift, findEmployeePosition },
    });
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const data = JSON.parse(req.body.data); // {address, birthdate}
    const { uid } = reqToken.payload;

    if (req.files) {
      const uploadedFiles = Array.isArray(req.files)
        ? req.files
        : req.files["images"];

      await createProfileAndImagesProfile(uid, data, uploadedFiles);
    }

    res.status(201).send({
      error: false,
      message: "Create Profile Success",
      data: null,
    });
  } catch (error) {
    deleteUploads(req.files);
    console.log(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    let result;

    if (req.files) {
      const uploadedFiles = Array.isArray(req.files)
        ? req.files
        : req.files["images"];
      result = await updateProfileAndImages(uid, uploadedFiles);
    }

    res.status(201).send({
      error: false,
      message: "Update Profile Success",
      data: result,
    });
    
    deleteUploadsfromUpdate(result?.url);
  } catch (error) {
    console.log(error);
    deleteUploads(req.files);
  }
};
