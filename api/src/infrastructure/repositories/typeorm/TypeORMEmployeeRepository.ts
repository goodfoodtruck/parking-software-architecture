import { AppDataSource } from "../../../config/db";
import { Employee } from "../../../entities/Employee.entity";
import { IEmployeeRepository } from "../../../repositories/IEmployeeRepository";

export class TypeORMEmployeeRepository implements IEmployeeRepository {

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