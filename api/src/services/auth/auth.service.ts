import { compare } from "bcrypt"
import { JwtService } from "./Jwt.service"
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository"

export class AuthService {
    constructor(
        private readonly employeeRepository: IEmployeeRepository,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string): Promise<{token: string}> {
        const user = await this.employeeRepository.findByEmail(email)
        if (! user) 
            throw new Error("Invalid credentials")
        
        const valid = await compare(password, user.password)
        if (! valid) 
            throw new Error("Invalid credentials")
        
        const secret = process.env.JWT_SECRET
        if (! secret) 
            throw new Error("JWT_SECRET environment variable is not set")
        
        const token = this.jwtService.generateAccessToken(user.id, secret)

        return { token }
    }
}