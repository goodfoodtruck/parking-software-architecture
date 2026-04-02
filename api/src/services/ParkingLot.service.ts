import { ParkingLotDTO } from "../dtos/out/ParkingLotDTO";
import { IParkingLotRepository } from "../repositories/IParkingLotRepository";
import { ReservationService } from "./Reservation.service";

export class ParkingLotService {
    constructor(
        private readonly parkingLotRepository: IParkingLotRepository,
        private readonly reservationService: ReservationService
    ) {}

    async getParkingLots(startDate?: Date, endDate?: Date): Promise<ParkingLotDTO[]> {
        const parkingLotsEntities = await this.parkingLotRepository.findAll()
        if (! parkingLotsEntities || ! parkingLotsEntities.length) {
            throw new Error("ERROR: No parking lots were found.")
        }
        
        const parkingLots: ParkingLotDTO[] = await Promise.all(
            parkingLotsEntities.map(async (parkingLot) => {
                const isAvailable = await this.reservationService.isAvailable(
                    parkingLot.id,
                    startDate,
                    endDate
                )

                return {
                    id: parkingLot.id,
                    name: parkingLot.name,
                    isElectric: parkingLot.electric,
                    available: isAvailable
                }
            })
        )

        return parkingLots
    }
}