import { Employee } from "../../../entities/Employee.entity"
import { IEmployeeRepository } from "../../../repositories/IEmployeeRepository"

export class InMemoryEmployeeRepository implements IEmployeeRepository {
    private employees: Employee[] = []

    constructor(initialData: Employee[] = []) {
        this.employees = initialData
    }

    async findById(employeeId: number): Promise<Employee | null> {
        return this.employees.find(e => e.id === employeeId) || null
    }

    async findAll(): Promise<Employee[]> {
        return this.employees
    }

    add(employee: Employee) {
        this.employees.push(employee)
    }
}