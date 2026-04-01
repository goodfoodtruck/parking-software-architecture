import { CreateReservationDTO } from "../dtos/in/CreateReservationDTO";
import { ParkingLot } from "../entities/ParkingLot.entity";
import { Reservation } from "../entities/Reservation.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class ReservationService {

    constructor(
        private readonly employeeRepository: IEmployeeRepository,
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly reservationRepository: IParkingLotReservationRepository
    ) {}

    async createReservation(dto: CreateReservationDTO) {
        const employee = await this.employeeRepository.findById(dto.employeeId)
        if (! employee)
            throw new Error("ERROR: Employee not found.")

        const parkingLot = await this.parkingLotRepository.findById(dto.parkingLotId)
        if (! parkingLot) 
            throw new Error("ERROR: Parking lot not found.")

        const available = await this.isAvailable(parkingLot, dto.startDate, dto.endDate)
        if (! available) 
            throw new Error("ERROR: Parking lot is not available.")
        
        const reservation = new Reservation()
        reservation.employee = employee
        reservation.parkingLot = parkingLot
        reservation.startDate = new Date(dto.startDate)
        reservation.endDate = new Date(dto.endDate)
        reservation.checkedIn = false

        const createdReservation = await this.reservationRepository.save(reservation)

        return createdReservation
    }

    async isAvailable(parkingLot: ParkingLot, startDate: Date, endDate: Date): Promise<boolean> {
        return this.reservationRepository.isAvailable(parkingLot, startDate, endDate)
    }

    async checkInParkingLot(parkingLotId: number, checkInMakerId: number) {
        const parkingLot = await this.parkingLotRepository.findById(parkingLotId)
        if (! parkingLot) 
            throw new Error("ERROR: Parking lot not found.")
        
        const parkingLotReservation = await this.reservationRepository.findByParkingLotId(parkingLotId)
        if (! parkingLotReservation)
            throw new Error("ERROR: No reservation found for this parking lot.")
        
        if (checkInMakerId !== parkingLotReservation.employee.id) 
            throw new Error("ERROR: The person doing to check in must be the same that reserved the parking lot.")

        await this.reservationRepository.save({
            ...parkingLotReservation,
            checkedIn: true
        })
    }
}