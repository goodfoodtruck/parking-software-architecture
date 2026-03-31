import { ParkingLot } from "../entities/ParkingLot.entity";
import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class ReservationService {

    constructor(
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly reservationRepository: IParkingLotReservationRepository
    ) {}

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