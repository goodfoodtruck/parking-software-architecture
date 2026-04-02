import { AController } from "./AController";
import { NextFunction, Request, Response } from "express"
import { AuthService } from "../services/auth/auth.service";

export class AuthController extends AController {
    constructor(
        private readonly authService: AuthService
    ) {
        super()
        this.router.post('/login', this.login)
    }
    
    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body;
            const auth = await this.authService.login(email, password);
            res.status(200).send({ token: auth.token });
            
        } catch (error) {
            next(error)
        }
    }
}