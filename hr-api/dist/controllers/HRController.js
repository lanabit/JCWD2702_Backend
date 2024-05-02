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
exports.createEmployee = exports.approvalLeaveRequest = void 0;
const HRService_1 = require("../services/HRService");
const hashing_1 = require("../helpers/hashing");
const approvalLeaveRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, HRService_1.updateLeaveRequest)({ id: parseInt(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.approvalLeaveRequest = approvalLeaveRequest;
const createEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, fullname, password, positionId, shiftId, address } = req.body;
        password = yield (0, hashing_1.HashPassword)({ password });
        console.log("hashed pass: ", password);
        yield (0, HRService_1.createEmployeeService)({
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
    }
    catch (error) {
        next(error);
    }
});
exports.createEmployee = createEmployee;
