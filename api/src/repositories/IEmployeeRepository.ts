import { Employee } from "../entities/Employee.entity";

export interface IEmployeeRepository {
    findById(employeeId: number): Promise<Employee | null>
    findAll(): Promise<Employee[]>
    save(employeeData: Employee): Promise<Employee>
    findByEmail(email: string): Promise<Employee | null>
}