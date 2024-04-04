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
exports.createLibraryAndStaff = exports.create = void 0;
const LibraryService_1 = require("./../services/LibraryService");
// IMPORT DATABASE SETUP
const promisfy_1 = require("../utils/promisfy");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, phone_number } = req.body;
        yield (0, LibraryService_1.createLibrary)({ address, phone_number });
        res.send({
            error: false,
            message: 'Create Library Success',
            data: {}
        });
    }
    catch (error) {
        // await query('ROLLBACK')
        console.log(error);
    }
});
exports.create = create;
// ROLLBACK TRANSACTION
// UNDO APABILA TERJADI ERROR KETIKA MODIFIKASI DATA KE LEBIH DARI 1 TABEL
const createLibraryAndStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // POSTMAN: library->address, phone_number; staff: name, email, password
        const { address, phone_number, name, email, password } = req.body;
        yield (0, LibraryService_1.createLibraryAndStaffQuery)({ address, phone_number, name, email, password });
    }
    catch (error) {
        yield (0, promisfy_1.query)('ROLLBACK');
        console.log(error);
    }
});
exports.createLibraryAndStaff = createLibraryAndStaff;
