import { AppDataSource } from "../../../config/db";
import { Reservation } from "../../../entities/Reservation.entity";
import { IParkingLotReservationRepository } from "../../../repositories/IParkingLotReservationRepository";

export class TypeORMParkingLotReservationRepository implements IParkingLotReservationRepository {

    private readonly repository = AppDataSource.getRepository(Reservation)

    constructor() {}
    
    async findById(id: number): Promise<Reservation | null> {
        return this.repository.findOne({
            where: { id },
            relations: ["employee"]
        });
    }

    async findAll(): Promise<Reservation[]> {
        return this.repository.find()
    }

    async save(reservation: Reservation): Promise<Reservation> {
        return this.repository.save(reservation)
    }
    
    async findByParkingLotId(id: number): Promise<Reservation | null> {
        return this.repository.findOneBy({ id })
    }

    async findCheckedInByParkingLotId(id: number): Promise<Reservation[]> {
        return this.repository
            .createQueryBuilder("r")
            .where("r.parking_lot_id = :id", { id })
            .andWhere("r.checked_in = true")
            .getMany()
    }

    async isAvailable(parkingLotId: number, dates: Date[]): Promise<boolean> {
        const existingReservation = await this.repository
            .createQueryBuilder("r")
            .where("r.parking_lot_id = :parkingLotId", { parkingLotId })
            .andWhere("r.date IN (:...dates)", { dates })
            .getOne()
            
        return existingReservation === null
    }
}