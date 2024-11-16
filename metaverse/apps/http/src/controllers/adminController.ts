import { Request, Response } from "express";
import { createAvatarSchema, createElementSchema, createMapSchema, updateElementSchema } from "../types";
import client from '@repo/db/client'


export const createElement = async (req: Request, res: Response) => {
    console.log("yes sir")
    const parsedData = createElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" })
        return
    }

    const element = await client.element.create({
        data: {
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static,
            imageUrl: parsedData.data.imageUrl
        }
    })

    res.json({
        id: element.id
    })
}

export const updateElement = async (req: Request, res: Response) => {
    const parsedData = updateElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" })
        return
    }

    await client.element.update({
        where: {
            id: req.params.elementId
        },
        data: {
            imageUrl: parsedData.data.imageUrl
        }
    })

    res.json({
        message: "Element updated"
    })
}

export const createAvatar = async (req: Request, res: Response) => {
    const parsedData = createAvatarSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" })
        return
    }

    const avatar = await client.avatar.create({
        data: {
            name: parsedData.data.name,
            imageUrl: parsedData.data.imageUrl
        }
    })

    res.json({
        avatarId: avatar.id
    })
}

export const createMap = async (req: Request, res: Response) => {
    const parsedData = createMapSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" })
        return
    }

    const map = await client.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data.defaultElements.map(e => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y
                }))
            }
        }
    })

    res.json({
        id: map.id
    })
}