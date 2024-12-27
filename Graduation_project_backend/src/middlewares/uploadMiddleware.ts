import { Request, Response, NextFunction } from "express";
import path from "path";
import { sendResponse } from "../helper/sendResponse";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req: Request, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
export default upload;