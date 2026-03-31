import { Request, Response } from "express";
import { Employee } from "../entities/Employee.entity";
import { AppDataSource } from "../config/db";

export class EmployeeController {
    private employeeRepository = AppDataSource.getRepository(Employee);

    async getEmployees(req: Request, res: Response) {
        const employees = await this.employeeRepository.find();
        return res.status(200).json(employees);
    }
}