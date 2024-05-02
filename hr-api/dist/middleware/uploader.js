"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = require("../helpers/multer");
const deleteUploadedFiles_1 = require("../helpers/deleteUploadedFiles");
const uploader = (req, res, next) => {
    const upload = multer_1.multerUpload.fields([{ name: "images", maxCount: 3 }]);
    upload(req, res, function (err) {
        try {
            if (err)
                throw err;
            if (req.files) {
                const uploadedFiles = Array.isArray(req.files)
                    ? req.files
                    : req.files["images"];
                if (Array.isArray(uploadedFiles)) {
                    uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.forEach((item) => {
                        if (item.size > Math.pow(10, 10)) {
                            throw { message: `${item.originalname} is Too Large` };
                        }
                    });
                }
            }
            next();
        }
        catch (error) {
            (0, deleteUploadedFiles_1.deleteUploads)(req.files);
            next({
                status: 300,
                message: error.message,
            });
        }
    });
};
exports.uploader = uploader;
