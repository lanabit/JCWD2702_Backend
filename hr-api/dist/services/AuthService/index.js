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
exports.findEmployeeByEmail = void 0;
const connection_1 = require("../../connection");
const findEmployeeByEmail = ({ email, }) => __awaiter(void 0, void 0, void 0, function* () {
    const findEmployee = yield connection_1.prisma.employee.findFirst({
        where: {
            email,
        },
        include: {
            EmployeeProfile: {
                include: {
                    EmployeeImagesProfile: true
                }
            }
        }
    });
    if (!findEmployee)
        throw new Error("Email is not registered");
    return findEmployee;
});
exports.findEmployeeByEmail = findEmployeeByEmail;
