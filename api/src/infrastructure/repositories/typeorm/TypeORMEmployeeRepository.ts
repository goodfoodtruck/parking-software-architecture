import { AppDataSource } from "../../../config/db";
import { Employee } from "../../../entities/Employee.entity";
import { IEmployeeRepository } from "../../../repositories/IEmployeeRepository";

export class TypeORMEmployeeRepository implements IEmployeeRepository {
    findByEmail(email: string): Promise<Employee | null> {
        throw new Error("Method not implemented.");
    }

    private readonly repository = AppDataSource.getRepository(Employee)
        
    findById(employeeId: number): Promise<Employee | null> {
        return this.repository.findOneBy({ id: employeeId })
    }

    findAll(): Promise<Employee[]> {
        return this.repository.find()
    }

    save(employee: Employee): Promise<Employee> {
        return this.repository.save(employee)
    }
}