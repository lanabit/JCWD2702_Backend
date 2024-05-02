import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const deleteUploads = (files: any) => {
  if (files) {
    const uploadedFiles = Array.isArray(files) ? files : files["images"];

    if (Array.isArray(uploadedFiles)) {
      uploadedFiles?.forEach((item) => {
        fs.rmSync(item.path);
      });
    }
  }
};

export const deleteUploadsfromUpdate = (path: any) => {
  fs.rmSync(path);
};
