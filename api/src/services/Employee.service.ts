import { Employee } from "../entities/Employee.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";

export class EmployeeService {
    constructor(
        private readonly employeeRepository: IEmployeeRepository,
    ) {}

    async getEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAll()
    }
}