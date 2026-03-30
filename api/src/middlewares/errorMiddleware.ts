import { Request, Response, NextFunction } from "express"
import logger from "../logger"

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(`Error in request ${req.method} ${req.url}: ${err}`)

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    })
}