import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import multer from 'multer';
import multerS3 from 'multer-s3'
import s3Client from "../../utils/s3Connect";
import { createAvatar, createElement, createMap, updateElement } from "../../controllers/adminController";

export const adminRouter = Router()


const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME!,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, `avatars/${Date.now().toString()}`)
    }
  })
})


adminRouter.use(adminMiddleware)

adminRouter.post('/element', createElement)

adminRouter.put('/element/:elementId', updateElement)

adminRouter.post('/avatar', upload.single('file'), createAvatar)

adminRouter.post('/map', createMap)