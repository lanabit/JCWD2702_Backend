import multer from "multer";
import fs from "fs";

const defaultDirectory = "src/public";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    const childDirectory = file.mimetype.split("/")[0];
    const isDirectoryExist = fs.existsSync(
      `${defaultDirectory}/${childDirectory}`
    );

    if (!isDirectoryExist) {
      fs.mkdirSync(`${defaultDirectory}/${childDirectory}`, {recursive: true});
    }

    cb(null, `${defaultDirectory}/${childDirectory}`);
  },
  filename: function (req, file, cb) {
    const randomNumber = Math.ceil(Math.random() * Math.pow(10, 10));
    const splitOriginalName = file.originalname.split(".");
    const fileExtension = splitOriginalName[splitOriginalName.length - 1];

    cb(null, `${randomNumber}.${fileExtension}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowed = ["webp", "jpg", "jpeg", "png"];

  const splitOriginalName = file.originalname.split(".");
  const fileExtension = splitOriginalName[splitOriginalName.length - 1];

  if (allowed.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("Format Not Accepted!"));
  }
};

export const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
