import { EmployeeService } from "../services/Employee.service";
import { UserService } from "../services/user.service";
import { AController } from "./AController";
import { NextFunction, Request, Response } from "express"

export class UserController extends AController {
    constructor(
        private readonly userService: UserService
    ) {
        super()
        this.router.get('/me', this.getCurrentUser)
    }

    private getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: number = (req as any).userId
            const user = await this.userService.getCurrentUser(userId)
            res.status(200).send({ success: true, user })
            
        } catch (error) {
            next(error)
        }
    }
}