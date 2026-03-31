import { AppDataSource } from "../config/db";
import { ParkingLot } from "../entities/ParkingLot.entity";
import { Reservation } from "../entities/Reservation.entity";

export class ReservationService {
    private reservationRepository = AppDataSource.getRepository(Reservation);

    async isAvailable(parkingLot: ParkingLot, startDate: Date, endDate: Date): Promise<boolean> {
        const existing = await this.reservationRepository
            .createQueryBuilder("r")
            .where("r.parkingLotId = :parkingLotId", { parkingLotId: parkingLot.id })
            .andWhere(
                "(r.startDate <= :endDate AND r.endDate >= :startDate)",
                { startDate, endDate }
            )
            .getOne();

        return ! existing;
    }
}