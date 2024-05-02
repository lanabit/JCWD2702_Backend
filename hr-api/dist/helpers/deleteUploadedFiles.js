"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadsfromUpdate = exports.deleteUploads = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteUploads = (files) => {
    if (files) {
        const uploadedFiles = Array.isArray(files) ? files : files["images"];
        if (Array.isArray(uploadedFiles)) {
            uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.forEach((item) => {
                fs_1.default.rmSync(item.path);
            });
        }
    }
};
exports.deleteUploads = deleteUploads;
const deleteUploadsfromUpdate = (path) => {
    fs_1.default.rmSync(path);
};
exports.deleteUploadsfromUpdate = deleteUploadsfromUpdate;
