import { Request, Response, Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { getAllAvatar, getAllElement, signin, signup } from "../../controllers/userController";

export const router = Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.get('/elements', getAllElement)

router.get('/avatars', getAllAvatar)

router.use('/user', userRouter)
router.use('/space', spaceRouter)
router.use('/admin', adminRouter)