import { NextFunction, Request, Response } from "express";
import { multerUpload } from "../helpers/multer";
import fs from "fs";
import { deleteUploads } from "../helpers/deleteUploadedFiles";

export const uploader = (req: Request, res: Response, next: NextFunction) => {
  const upload = multerUpload.fields([{ name: "images", maxCount: 3 }]);

  upload(req, res, function (err) {
    try {
      if (err) throw err;

      if (req.files) {
        const uploadedFiles = Array.isArray(req.files)
          ? req.files
          : req.files["images"];

        if (Array.isArray(uploadedFiles)) {
          uploadedFiles?.forEach((item) => {
            if (item.size > Math.pow(10, 10)) {
              throw { message: `${item.originalname} is Too Large` };
            }
          });
        }
      }

      next();
    } catch (error: any) {
      deleteUploads(req.files);

      next({
        status: 300,
        message: error.message,
      });
    }
  });
};
