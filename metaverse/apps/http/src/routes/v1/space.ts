import { Router } from "express";
import { userMiddleware } from "../../middleware/user";
import { addElementToSpace, createSpace, deleteElement, deleteSpace, getAllSpace, getSpecificSpace } from "../../controllers/spaceController";

export const spaceRouter = Router()

spaceRouter.post('/', userMiddleware, createSpace)

spaceRouter.delete('/:spaceId', userMiddleware, deleteSpace)

spaceRouter.get('/:spaceId', getSpecificSpace)

spaceRouter.get('/all', userMiddleware, getAllSpace)

spaceRouter.delete('/element', userMiddleware, deleteElement)

spaceRouter.post('/element', userMiddleware, addElementToSpace)
