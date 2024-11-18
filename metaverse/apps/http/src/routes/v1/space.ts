import { Router } from "express";
import { userMiddleware } from "../../middleware/user";
import { addElementToSpace, createSpace, deleteElement, deleteSpace, getAllSpace, getSpecificSpace } from "../../controllers/spaceController";

export const spaceRouter = Router()

spaceRouter.post('/', userMiddleware, createSpace)

spaceRouter.delete('/element', userMiddleware, deleteElement)

spaceRouter.delete('/:spaceId', userMiddleware, deleteSpace)

spaceRouter.get('/all', userMiddleware, getAllSpace)

spaceRouter.get('/:spaceId', getSpecificSpace)

spaceRouter.post('/element', userMiddleware, addElementToSpace)
