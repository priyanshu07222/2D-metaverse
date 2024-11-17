

import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization // [Bearer, token]
    const token = header?.split(" ")[1];

    if (!token) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    // console.log("djflkdajl"

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string, userId: string }

        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({
            message: "Something went worn"
        })
        return
    }
}