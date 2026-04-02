import { ReservationController } from './controllers/Reservation.controller';
import { EmployeeController } from './controllers/Employee.controller';
import { ReservationService } from './services/Reservation.service';
import { TypeORMEmployeeRepository } from './infrastructure/repositories/typeorm/TypeORMEmployeeRepository';
import { TypeORMParkingLotReservationRepository } from './infrastructure/repositories/typeorm/TypeORMParkingLotReservationRepository';
import { TypeORMParkingLotRepository } from './infrastructure/repositories/typeorm/TypeORMParkingLotRepository';
import { EmployeeService } from './services/Employee.service';
import { ParkingLotController } from './controllers/ParkingLot.controller';
import { ParkingLotService } from './services/ParkingLot.service';
import { ManagerDashboardController } from './controllers/ManagerDashboard.controller';
import { ManagerDashboardService } from './services/ManagerDashboard.service';
import { create } from 'node:domain';
import { UserController } from './controllers/User.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/Auth.controller';
import { JwtService } from './services/auth/Jwt.service';
import { InMemoryEmployeeRepository } from './tests/mocks/repositories/InMemoryEmployeeRepository';

const employeeRepository = new TypeORMEmployeeRepository()
const reservationRepository = new TypeORMParkingLotReservationRepository()
const parkingLotRepository = new TypeORMParkingLotRepository()

const createReservationController = (): ReservationController => {
    const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)
    const controller = new ReservationController(reservationService)
    return controller
}

const createEmployeeController = (): EmployeeController => {
    const employeeService = new EmployeeService(employeeRepository)
    const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository);
    const controller = new EmployeeController(employeeService, reservationService);
    return controller
}

const createParkingLotController = (): ParkingLotController => {
    const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)
    const parkingLotService = new ParkingLotService(parkingLotRepository, reservationService)    
    const controller = new ParkingLotController(parkingLotService)
    return controller
}

const createManagerDashboardController = (): ManagerDashboardController => {
    const managerDashboardService = new ManagerDashboardService(reservationRepository)
    const controller = new ManagerDashboardController(managerDashboardService)
    return controller
}

const createAuthController = (): AuthController => {
    const jwtService = new JwtService() 
    const employeeRepository = new InMemoryEmployeeRepository()
    const authService = new AuthService(employeeRepository, jwtService)
    const controller = new AuthController(authService)
    return controller
}

const createUserController = (): UserController => {
    const userRepository = new InMemoryEmployeeRepository()
    const userService = new UserService(userRepository)
    const controller = new UserController(userService)
    return controller
}

export const reservationController = createReservationController()
export const employeeController = createEmployeeController()
export const parkingLotController = createParkingLotController()
export const dashboardController = createManagerDashboardController()
export const authController = createAuthController()
export const usersController = createUserController()