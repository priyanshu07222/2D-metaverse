import { Request, Response } from "express";
import { AddElementSchema, createSpaceSchema, deleteElementSchema } from "../types";
import client from '@repo/db/client'

export const createSpace = async (req: Request, res: Response) => {
    const parsedData = createSpaceSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation failed"
        })
        return
    }

    if (!parsedData.data.mapId) {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                createrId: req.userId as string
            }
        })
        res.json({ spaceId: space.id })
        return
    }

    const map = await client.map.findUnique({
        where: {
            id: parsedData.data.mapId
        },
        select: {
            mapElements: true,
            width: true,
            height: true
        }
    })

    if (!map) {
        res.status(403).json({ message: "Map not found" })
        return
    }

    let space = await client.$transaction(async () => {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                createrId: req.userId,

            }
        })
        console.log("Createspace4688")

        await client.spaceElements.createMany({
            data: map.mapElements.map(e => ({
                spaceId: space.id,
                elementId: e.elementId,
                x: e.x!,
                y: e.y!
            }))
        })

        console.log("Createspace998")


        return space;
    })

    res.json({ spaceId: space.id })
}

export const deleteElement = async (req: Request, res: Response) => {
    const parsedData = deleteElementSchema.safeParse(req.body)

    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" })
        return
    }


    const spaceElement = await client.spaceElements.findFirst({
        where: {
            id: parsedData.data.id
        },
        include: {
            space: true
        }
    })


    if (!spaceElement?.space.createrId || spaceElement.space.createrId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" })
        return
    }


    await client.spaceElements.delete({
        where: {
            id: parsedData.data.id
        }
    })
    // console.log("is able to deleteedddddddddddddd")


    res.json({ message: "Element deleted" })
}

export const deleteSpace = async (req: Request, res: Response) => {
    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId
        }, select: {
            createrId: true
        }
    })


    if (!space) {
        res.status(400).json({ message: "Space not found" })
        return
    }


    if (space.createrId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" })
        return
    }


    await client.space.delete({
        where: {
            id: req.params.spaceId
        }
    })
    res.json({ message: "Space deleted" })
}


export const getAllSpace = async (req: Request, res: Response) => {
    const spaces = await client.space.findMany({
        where: {
            createrId: req.userId!
        }
    });

    res.json({
        spaces: spaces.map(s => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`,
        }))
    })
}


export const getSpecificSpace = async (req: Request, res: Response) => {
    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            elements: {
                include: { element: true }
            }
        }
    })

    if (!space) {
        res.status(400).json({ message: "Space not found" })
        return
    }

    res.json({
        dimensions: `${space.width}x${space.height}`,
        elements: space.elements.map(e => ({
            id: e.id,
            element: {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static
            },
            x: e.x,
            y: e.y
        }))
    })
}

export const addElementToSpace = async (req: Request, res: Response) => {
    const parsedData = AddElementSchema.safeParse(req.body)
    if (!parsedData) {
        res.status(400).json({
            message: "Validation failed"
        })
    }

    const space = await client.space.findUnique({
        where: {
            id: parsedData.data?.spaceId,
            createrId: req.body.userId
        }, select: {
            width: true,
            height: true
        }
    })

    if (req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!) {
        res.status(400).json({ message: "Point is outside of the boundary" })
        return
    }

    if (!space) {
        res.status(400).json({
            message: "Space not found"
        })
        return
    }

    await client.spaceElements.create({
        data: {
            spaceId: req.body.spaceId,
            elementId: req.body.elementId,
            x: req.body.x,
            y: req.body.y
        }
    })

    res.json({ message: "Element added" })
}