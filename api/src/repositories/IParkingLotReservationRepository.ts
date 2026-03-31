import { ParkingLot } from "../entities/ParkingLot.entity";

export interface IParkingLotReservationRepository {
    isAvailable(parkingLot: ParkingLot, startDate: Date, endDate: Date): Promise<boolean>
}