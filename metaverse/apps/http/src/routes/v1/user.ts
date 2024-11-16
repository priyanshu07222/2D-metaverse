import { Router } from "express";
import { metadataController, otherUserMetadataController } from "../../controllers/userController";
import { userMiddleware } from "../../middleware/user";

export const userRouter = Router()

userRouter.post('/metadeta', userMiddleware, metadataController)

userRouter.get('/metadata/bulk', otherUserMetadataController)
