import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/Employee.service";
import { AController } from "./AController";

export class EmployeeController extends AController {
    constructor(
        private readonly employeeService: EmployeeService
    ) {
        super()
        this.router.get("/", this.getEmployees)
    }

    private getEmployees = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const employees = await this.employeeService.getEmployees()
            return res.status(200).json(employees)
        }
        catch(error) {
            next(error)
        }
    }
}