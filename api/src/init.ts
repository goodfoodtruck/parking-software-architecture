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
    const controller = new EmployeeController(employeeService)
    return controller
}

const createParkingLotController = (): ParkingLotController => {
    const parkingLotService = new ParkingLotService(parkingLotRepository)    
    const controller = new ParkingLotController(parkingLotService)
    return controller
}

const createManagerDashboardController = (): ManagerDashboardController => {
    const managerDashboardService = new ManagerDashboardService(reservationRepository)
    const controller = new ManagerDashboardController(managerDashboardService)
    return controller
}

export const reservationController = createReservationController()
export const employeeController = createEmployeeController()
export const parkingLotController = createParkingLotController()
export const dashboardController = createManagerDashboardController()