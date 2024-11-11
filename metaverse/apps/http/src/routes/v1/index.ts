import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";

export const router = Router()

router.post('/signup', () => { })

router.post('/signin', () => { })

router.get('/elements', () => { })

router.get('/avatars', () => { })

router.use('/user', userRouter)
router.use('/space', spaceRouter)
router.use('/admin', adminRouter)