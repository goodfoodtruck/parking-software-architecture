import { CreateEmployeeDTO } from "../dtos/in/CreateEmployeeDTO";
import { Employee } from "../entities/Employee.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";

export class EmployeeService {
    constructor(
        private readonly employeeRepository: IEmployeeRepository,
    ) {}

    async getEmployees(): Promise<Employee[] | []> {
        const allEmployees = await this.employeeRepository.findAll();
        const employees = allEmployees.map(employee => {
            if(employee.role === "EMPLOYEE") {
                return employee;
            }
        })
        return employees.filter(employee => employee !== undefined) as Employee[];
    }

    async createEmployee(employee: CreateEmployeeDTO): Promise<Employee> {
        const newEmployee = new Employee(employee.firstName, employee.lastName, employee.email, employee.phone, employee.automobile, employee.electric, 'EMPLOYEE');

        const createdEmployee = await this.employeeRepository.save(newEmployee);
        return createdEmployee;
    }   
}