import { Router } from "express";
import { metadataController, otherUserMetadataController } from "../../controllers/userController.js";
import { userMiddleware } from "../../middleware/user.js";

export const userRouter = Router()

userRouter.post('/metadeta', userMiddleware, metadataController)

userRouter.get('/metadata/bulk', otherUserMetadataController)
