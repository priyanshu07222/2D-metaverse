

import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization // [Bearer, token]
    const token = header?.split(" ")[1];

    if (!token) {
        res.status(403).json({
            message: "Unauthorized1"
        })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string, userId: string }
        if (decoded.role !== "Admin") {
            res.status(403).json({
                message: "Unauthorized2"
            })
            return
        }

        req.userId === decoded.userId
        next()
    } catch (error) {
        res.status(401).json({
            message: "Something went worn"
        })
        return
    }
}