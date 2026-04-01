import { ParkingLotDTO } from "../dtos/out/ParkingLotDTO";
import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { ReservationService } from "./Reservation.service";

export class ParkingLotService {
    constructor(
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly reservationService: ReservationService
    ) {}

    async getAll(): Promise<ParkingLotDTO[]> {
        const parkingLotsEntities = await this.parkingLotRepository.findAll();
        if (! parkingLotsEntities || ! parkingLotsEntities.length)
            throw new Error("ERROR: No parking lots were found.")

        const parkingLots: ParkingLotDTO[] = []

        for (const parkingLot of parkingLotsEntities) {
            const isAvailable = await this.reservationService.isAvailable(parkingLot.id);
            parkingLots.push({
                id: parkingLot.id,
                name: parkingLot.name,
                isElectric: parkingLot.electric,
                available: isAvailable
            });
        }

        return parkingLots
    }
}