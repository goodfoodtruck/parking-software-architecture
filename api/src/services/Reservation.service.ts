import { CreateReservationDTO } from "../dtos/in/CreateReservationDTO";
import { Reservation } from "../entities/Reservation.entity";
import { publishReservationCreated } from "../producer";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class ReservationService {

    private readonly EMPLOYEE_MAX_RESERVATION_DURATION_DAYS = 5
    private readonly MANAGER_MAX_RESERVATION_DURATION_DAYS = 30

    constructor(
        private readonly employeeRepository: IEmployeeRepository,
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly reservationRepository: IParkingLotReservationRepository
    ) {}

    async createReservation(dto: CreateReservationDTO) {
        const employee = await this.employeeRepository.findById(dto.employeeId)
        if (! employee)
            throw new Error("ERROR: Employee not found.")

        const startDate = new Date(dto.startDate)
        const endDate = new Date(dto.endDate)
        this.validateReservationDates(startDate, endDate, this.EMPLOYEE_MAX_RESERVATION_DURATION_DAYS)

        const parkingLot = await this.parkingLotRepository.findById(dto.parkingLotId)
        if (! parkingLot) 
            throw new Error("ERROR: Parking lot not found.")

        const available = await this.isAvailable(parkingLot.id, startDate, endDate)
        if (! available) 
            throw new Error("ERROR: Parking lot is not available.")
        
        const reservation = new Reservation()
        reservation.employee = employee
        reservation.parkingLot = parkingLot
        reservation.startDate = startDate
        reservation.endDate = endDate
        reservation.checkedIn = false

        const createdReservation = await this.reservationRepository.save(reservation)

        return createdReservation
    }

    async isAvailable(parkingLotId: number, startDate: Date, endDate: Date): Promise<boolean> {
        return this.reservationRepository.isAvailable(parkingLotId, startDate, endDate)
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

    validateReservationDates(startDate: Date, endDate: Date, maxDurationInDays: number): boolean {
        const msPerDay = 24 * 60 * 60 * 1000

        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

        if (end < start) 
            return false

        const durationInDays = Math.floor((end.getTime() - start.getTime()) / msPerDay) + 1

        return ((durationInDays >= 1) && (durationInDays <= maxDurationInDays))
    }
}