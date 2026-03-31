import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class CheckInService {

    constructor(
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly parkingLotReservationRepository: IParkingLotReservationRepository
    ) {}

    checkInParkingLot(parkingLotId: string) {
        // get parking lot
        // check if a reservation exists
        // check if user making request is the same that reserved the lot
        // save parking lot status as checkedIn
    }
}
