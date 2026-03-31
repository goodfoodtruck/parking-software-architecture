import { AppDataSource } from "../../../config/db";
import { ParkingLot } from "../../../entities/ParkingLot.entity";
import { IParkingLotReservationRepository } from "../../../repositories/IParkingLotReservationRepository";

export class TypeORMParkingLotReservationRepository implements IParkingLotReservationRepository {

    private readonly repository = AppDataSource.getRepository(ParkingLot)

    constructor() {}

    async isAvailable(parkingLot: ParkingLot, startDate: Date, endDate: Date): Promise<boolean> {
        const existingLot = await this.repository
            .createQueryBuilder("r")
            .where("r.parkingLotId = :parkingLotId", { parkingLotId: parkingLot.id })
            .andWhere(
                "(r.startDate <= :endDate AND r.endDate >= :startDate)",
                { startDate, endDate }
            )
            .getOne()

        return (existingLot !== null)
    }
}