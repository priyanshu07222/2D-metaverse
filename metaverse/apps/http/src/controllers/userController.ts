import { Request, Response } from "express";
import { signinSchema, signupSchema, updateMetadataSchema } from "../types";
import client from '@repo/db/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";

export const signup = async (req: Request, res: Response): Promise<any> => {
    const parsedData = await signupSchema.safeParse(req.body)
    console.log(parsedData.data?.username, parsedData.data?.type, parsedData.data?.password, parsedData.success, "singup")

    if (!parsedData.success) {
        return res.status(400).json({ message: "Validation failed" })
    }
    console.log("1")

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)

    try {
        const userAlreadyExist = await client.user.findFirst({
            where: {
                username: parsedData.data.username
            }
        })

        if (userAlreadyExist) {
            res.status(400).json({ message: "user already exist" })
            return;
        }

        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                role: parsedData.data.type === "admin" ? "Admin" : "User"
            }
        })

        console.log("3")
        res.json({
            userId: user.id
        })
    } catch (error) {
        res.status(401).json({
            message: "User already exists"
        })

    }

}


export const signin = async (req: Request, res: Response): Promise<any> => {
    const parsedData = signinSchema.safeParse(req.body)
    console.log(parsedData.data?.username, parsedData.data?.password, "singin")

    if (!parsedData.success) {
        return res.status(403).json({ message: "Validation failed" })
    }

    try {
        console.log("signin", "1")
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username
            }
        })
        console.log("signin", "2")

        if (!user) {
            res.status(403).json({
                message: "User not found"
            })
            return
        }

        const isValid = await bcrypt.compare(parsedData.data.password, user?.password)
        console.log("signin", "3")

        if (!isValid) {
            res.status(403).json({
                message: "Invalid password"
            })
            return
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, JWT_SECRET)
        console.log("signin", "4c")

        res.json({
            token
        })
    } catch (error) {
        res.status(400).json({
            message: "Internal server error"
        })
    }

}

export const metadataController = async (req: Request, res: Response) => {
    const parsedData = updateMetadataSchema.safeParse(req.body)
    if (!parsedData) {
        res.status(400).json({
            message: "Validation failed"
        })
    }

    // console.log(req.userId, "userid")
    // console.log(parsedData.data?.avatarId, "useridjhkjlhj44444")

    try {
        await client.user.update({
            where: {
                id: req.userId
            },
            data: {
                avatarId: parsedData.data?.avatarId
            }
        })
        res.json({ message: "Metadata updated" })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })
    }


}

export const otherUserMetadataController = async (req: Request, res: Response) => {
    const userIds = (req.query.ids ?? "[]") as string
    const userIdAsArray = (userIds).slice(1, userIds?.length - 1).split(",");
    // console.log(userIds, userIdAsArray)

    const metadata = await client.user.findMany({
        where: {
            id: { in: userIdAsArray }
        }, select: {
            avatar: true,
            id: true
        }
    })

    res.json({
        avatars: metadata.map(m => ({
            userId: m.id,
            avatarId: m.avatar?.imageUrl
        }))
    })
}

export const getAllElement = async (req: Request, res: Response) => {
    const elements = await client.element.findMany()

    res.json({
        elements: elements.map(e => ({
            id: e.id,
            imageUrl: e.imageUrl,
            width: e.width,
            height: e.height,
            static: e.static
        }))
    })
}

export const getAllAvatar = async (req: Request, res: Response) => {
    const avatars = await client.avatar.findMany()
    // console.log(avatars, "avatars")

    res.json({
        avatars: avatars.map(e => ({
            id: e.id,
            imageUrl: e.imageUrl,
            name: e.name
        }))
    })
}