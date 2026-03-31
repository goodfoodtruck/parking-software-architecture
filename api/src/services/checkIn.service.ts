import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class CheckInService {

    constructor(
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly parkingLotReservationRepository: IParkingLotReservationRepository
    ) {}

    async checkInParkingLot(parkingLotId: number, checkInMakerId: number) {
        const parkingLot = await this.parkingLotRepository.findById(parkingLotId)
        if (! parkingLot) 
            throw new Error("ERROR: Parking lot not found.")
        
        const parkingLotReservation = await this.parkingLotReservationRepository.findByParkingLotId(parkingLotId)
        if (! parkingLotReservation)
            throw new Error("ERROR: No reservation found for this parking lot.")
        
        if (checkInMakerId !== parkingLotReservation.employee.id) 
            throw new Error("ERROR: The person doing to check in must be the same that reserved the parking lot.")

        await this.parkingLotReservationRepository.save({
            ...parkingLotReservation,
            checkedIn: true
        })
    }
}
