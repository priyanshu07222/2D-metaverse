import { Router } from "express";

export const spaceRouter = Router()

spaceRouter.post('/', () => { })

spaceRouter.delete('/:spaceId', () => { })

spaceRouter.get('/:spaceId', () => { })

spaceRouter.get('/all', () => { })


spaceRouter.post('/element', () => { })

spaceRouter.delete('/element', () => { })