import { Router } from "express";
import { userRouter } from "./user.js";
import { spaceRouter } from "./space.js";
import { adminRouter } from "./admin.js";
import { getAllAvatar, getAllElement, signin, signup } from "../../controllers/userController.js";

export const router = Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.get('/elements', getAllElement)

router.get('/avatars', getAllAvatar)

router.use('/user', userRouter)
router.use('/space', spaceRouter)
router.use('/admin', adminRouter)