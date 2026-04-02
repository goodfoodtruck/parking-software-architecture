import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
export class UserService {
    constructor(
        private readonly userRepository: IEmployeeRepository
    ) {}

    async getCurrentUser(employeeId: number) {
        const currentUser = await this.userRepository.findById(employeeId)
        if (! currentUser)
            throw new Error("Current user not found")

        return currentUser
    }
}