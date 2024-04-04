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
exports.createLibraryAndStaffQuery = exports.createLibrary = void 0;
// IMPORT DATABASE SETUP
const promisfy_1 = require("../utils/promisfy");
const createLibrary = ({ address, phone_number }) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, promisfy_1.query)('INSERT INTO library_branch(address, phone_number) VALUES (?, ?)', [address, phone_number]);
});
exports.createLibrary = createLibrary;
const createLibraryAndStaffQuery = ({ address, phone_number, name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, promisfy_1.query)('START TRANSACTION');
    const createLibrary = yield (0, promisfy_1.query)('INSERT INTO library_branch(address, phone_number) VALUES (?, ?)', [address, phone_number]);
    const createStaff = yield (0, promisfy_1.query)('INSERT INTO staffs(name, email, password, library_branch_id) VALUES (?, ?, ?, ?)', [name, email, password, createLibrary.insertId]);
    yield (0, promisfy_1.query)('COMMIT');
});
exports.createLibraryAndStaffQuery = createLibraryAndStaffQuery;
