"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.createProfile = exports.employeeShiftandPosition = exports.employeePosition = exports.leaveRequest = exports.clockout = exports.clockin = exports.getAllEmployees = void 0;
const EmployeeService_1 = require("../services/EmployeeService");
const token_1 = require("../helpers/token");
const deleteUploadedFiles_1 = require("../helpers/deleteUploadedFiles");
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, EmployeeService_1.getEmployees)();
        res.status(200).send(employees);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEmployees = getAllEmployees;
const clockin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { employeeid } = req.headers;
        if (!employeeid)
            throw new Error("please send with header");
        const uid = (0, token_1.uidDecoding)(employeeid);
        yield (0, EmployeeService_1.createAttendanceClockIn)(uid);
        res.status(201).send({
            error: false,
            message: "clock in success!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.clockin = clockin;
const clockout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        yield (0, EmployeeService_1.createAttendanceClockOut)(id);
        res.status(201).send({
            error: false,
            message: "clock out success!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.clockout = clockout;
const leaveRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.body;
        let { employeeid } = req.headers;
        yield (0, EmployeeService_1.createLeaveRequestService)({ startDate, endDate, employeeid });
        res.status(201).send({
            error: false,
            message: "Leave Request Success",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.leaveRequest = leaveRequest;
const employeePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findEmployeePosition = yield (0, EmployeeService_1.getPosition)();
        res.status(200).send({
            error: false,
            message: "Get Employee Position Success!",
            data: findEmployeePosition,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.employeePosition = employeePosition;
const employeeShiftandPosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findEmployeeShift = yield (0, EmployeeService_1.getShift)();
        const findEmployeePosition = yield (0, EmployeeService_1.getPosition)();
        res.status(200).send({
            error: false,
            message: "Get Employee Position Success!",
            data: { findEmployeeShift, findEmployeePosition },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.employeeShiftandPosition = employeeShiftandPosition;
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqToken = req;
        const data = JSON.parse(req.body.data); // {address, birthdate}
        const { uid } = reqToken.payload;
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files)
                ? req.files
                : req.files["images"];
            yield (0, EmployeeService_1.createProfileAndImagesProfile)(uid, data, uploadedFiles);
        }
        res.status(201).send({
            error: false,
            message: "Create Profile Success",
            data: null,
        });
    }
    catch (error) {
        (0, deleteUploadedFiles_1.deleteUploads)(req.files);
        console.log(error);
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqToken = req;
        const { uid } = reqToken.payload;
        let result;
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files)
                ? req.files
                : req.files["images"];
            result = yield (0, EmployeeService_1.updateProfileAndImages)(uid, uploadedFiles);
        }
        res.status(201).send({
            error: false,
            message: "Update Profile Success",
            data: result,
        });
        (0, deleteUploadedFiles_1.deleteUploadsfromUpdate)(result === null || result === void 0 ? void 0 : result.url);
    }
    catch (error) {
        console.log(error);
        (0, deleteUploadedFiles_1.deleteUploads)(req.files);
    }
});
exports.updateProfile = updateProfile;
