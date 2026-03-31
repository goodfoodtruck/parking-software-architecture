import { NextFunction, Request, Response } from "express"
import { JwtService } from "../services/auth/Jwt.service"

export const authMiddleware = (jwtService: JwtService) =>
    (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization
        if (! authHeader)
            return res.status(401).send("Unauthorized")

        const token = authHeader.split(" ")[1]

        try {
            const payload = jwtService.verifyAccessToken(token)
            ;(req as any).userId = payload.userId
            next()
        } catch {
            return res.status(401).send("Invalid token")
        }
    }