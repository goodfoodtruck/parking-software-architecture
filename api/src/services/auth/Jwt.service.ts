import jwt from "jsonwebtoken"

export class JwtService {

    generateAccessToken(userId: number, secret: string): string {
        return jwt.sign(
            { userId },
            secret,
            { expiresIn: "1h" }
        )
    }

    verifyAccessToken(token: string): { userId: string } {
        return jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { userId: string }
    }
}