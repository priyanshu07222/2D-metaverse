import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import multer from 'multer';
import { createAvatar, createElement, createMap, updateElement } from "../../controllers/adminController";

export const adminRouter = Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });


adminRouter.use(adminMiddleware)

adminRouter.post('/element', createElement)

adminRouter.put('/element/:elementId', updateElement)

adminRouter.post('/avatar', upload.single('file'), createAvatar)

adminRouter.post('/map', createMap)