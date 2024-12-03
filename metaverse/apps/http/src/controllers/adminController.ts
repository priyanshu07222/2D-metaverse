import { Request, Response } from "express";
import { createAvatarSchema, createElementSchema, createMapSchema, updateElementSchema } from "../types";
import client from '@repo/db/client'
import uploadToS3 from "../utils/uploadToS3";
import fs from 'fs'
import path from "path";

export const createElement = async (req: Request, res: Response) => {
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
    try {
        const file = req.file
        const parsedData = createAvatarSchema.safeParse(req.body)
        if (!parsedData.success) {
            res.status(400).json({ message: "Validation failed" })
            return
        }
        if (!file) {
            res.status(400).json({ message: "File not found" })
            return
        }
        const filePath = path.resolve(file.path);
        const fileBuffer = fs.readFileSync(filePath);
        const s3Key = `avatars/${file.originalname}`;

        const s3Response = await uploadToS3(s3Key, fileBuffer);
        console.log("after s3 upload");

        fs.unlinkSync(filePath);

        res.status(200).json({ message: "Avatar uploaded successfully", data: s3Response });


        // const avatar = await client.avatar.create({
        //     data: {
        //         name: parsedData.data.name,
        //         imageUrl: parsedData.data.imageUrl
        //     }
        // })

        // res.json({
        //     avatarId: avatar.id
        // })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
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