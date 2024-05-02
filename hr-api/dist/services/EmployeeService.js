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
exports.updateProfileAndImages = exports.createProfileAndImagesProfile = exports.getPosition = exports.getShift = exports.createLeaveRequestService = exports.createAttendanceClockOut = exports.createAttendanceClockIn = exports.getEmployeeById = exports.getEmployees = void 0;
const connection_1 = require("../connection");
const getEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield connection_1.prisma.employee.findMany({
        include: {
            position: true,
            shift: true,
        },
    });
    return employees;
});
exports.getEmployees = getEmployees;
const getEmployeeById = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield connection_1.prisma.employee.findUnique({
        where: {
            uid,
        },
        include: {
            position: true,
            shift: true,
        },
    });
    return employee;
});
exports.getEmployeeById = getEmployeeById;
const createAttendanceClockIn = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.prisma.attendance.create({
        data: {
            date: new Date(),
            clockin: new Date(),
            employeeId: id,
            deduction: 0,
        },
    });
});
exports.createAttendanceClockIn = createAttendanceClockIn;
const createAttendanceClockOut = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.prisma.attendance.update({
        where: {
            id,
        },
        data: {
            clockout: new Date(),
        },
    });
});
exports.createAttendanceClockOut = createAttendanceClockOut;
const createLeaveRequestService = ({ startDate, endDate, employeeid, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.prisma.leaveRequest.create({
        data: {
            stardDate: new Date(startDate),
            endDate: new Date(endDate),
            employeeId: employeeid,
        },
    });
});
exports.createLeaveRequestService = createLeaveRequestService;
const getShift = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.shift.findMany();
});
exports.getShift = getShift;
const getPosition = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.position.findMany();
});
exports.getPosition = getPosition;
const createProfileAndImagesProfile = (uid, data, images) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdEmployeeProfile = yield tx.employeeProfile.create({
            data: {
                birthDate: new Date(data.birthDate),
                address: data.address,
                employeeUid: uid,
            },
        });
        const imagesToCreate = [];
        images.forEach((item) => {
            imagesToCreate.push({
                url: item.path,
                employeeProfileId: createdEmployeeProfile.id,
            });
        });
        yield tx.employeeImagesProfile.createMany({
            data: [...imagesToCreate],
        });
    }));
});
exports.createProfileAndImagesProfile = createProfileAndImagesProfile;
const updateProfileAndImages = (uid, images) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findEmployee = yield connection_1.prisma.employee.findUnique({
        where: {
            uid,
        },
        include: {
            EmployeeProfile: {
                include: {
                    EmployeeImagesProfile: true,
                },
            },
        },
    });
    const prevUrl = yield connection_1.prisma.employeeImagesProfile.findUnique({
        where: {
            id: (_a = findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.EmployeeProfile) === null || _a === void 0 ? void 0 : _a.EmployeeImagesProfile[0].id,
        },
    });
    const imagesToCreate = [];
    images.forEach((item) => {
        var _a;
        imagesToCreate.push({
            url: item.path,
            employeeProfileId: (_a = findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.EmployeeProfile) === null || _a === void 0 ? void 0 : _a.id,
        });
    });
    yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.employeeImagesProfile.update({
            where: {
                id: prevUrl === null || prevUrl === void 0 ? void 0 : prevUrl.id,
            },
            data: imagesToCreate[0],
        });
    }));
    return prevUrl;
});
exports.updateProfileAndImages = updateProfileAndImages;
