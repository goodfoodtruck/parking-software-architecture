import { AppDataSource } from "../../../config/db";
import { ParkingLot } from "../../../entities/ParkingLot.entity";
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

    async isAvailable(parkingLot: ParkingLot, startDate: Date, endDate: Date): Promise<boolean> {
        const existingLot = await this.repository
            .createQueryBuilder("r")
            .where("r.parking_lot_id = :parkingLotId", { parkingLotId: parkingLot.id })
            .andWhere(
                "(r.startDate <= :endDate AND r.endDate >= :startDate)",
                { startDate, endDate }
            )
            .getOne()

        return (existingLot !== null)
    }
}