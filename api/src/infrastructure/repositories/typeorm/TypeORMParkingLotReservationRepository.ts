import { AppDataSource } from "../../../config/db";
import { Reservation } from "../../../entities/Reservation.entity";
import { IParkingLotReservationRepository } from "../../../repositories/IParkingLotReservationRepository";

export class TypeORMParkingLotReservationRepository implements IParkingLotReservationRepository {

    private readonly repository = AppDataSource.getRepository(Reservation)

    constructor() {}

    save(reservation: Reservation): Promise<Reservation> {
        return this.repository.save(reservation)
    }
    
    findByParkingLotId(id: number): Promise<Reservation | null> {
        return this.repository.findOneBy({ id })
    }

    async isAvailable(parkingLotId: number, startDate: Date, endDate: Date): Promise<boolean> {
        const existingReservation = await this.repository
            .createQueryBuilder("r")
            .where("r.parking_lot_id = :parkingLotId", { parkingLotId })
            .andWhere(
                "(r.start_date <= :endDate AND r.end_date >= :startDate)",
                { startDate, endDate }
            )
            .getOne()

        return existingReservation === null
    }
}