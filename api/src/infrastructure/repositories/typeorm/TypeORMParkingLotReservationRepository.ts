import { Between } from "typeorm";
import { AppDataSource } from "../../../config/db";
import { Reservation } from "../../../entities/Reservation.entity";
import { IParkingLotReservationRepository } from "../../../repositories/IParkingLotReservationRepository";

export class TypeORMParkingLotReservationRepository implements IParkingLotReservationRepository {

    private readonly repository = AppDataSource.getRepository(Reservation)

    constructor() {}

    async findByDate(date: Date): Promise<Reservation[]> {
        const start = new Date(date.setHours(0, 0, 0, 0));
        const end = new Date(date.setHours(23, 59, 59, 999)); 
        
        return await this.repository.find({
            where: { date: Between(start, end) }
        });
    }
    
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
            .andWhere("r.cancelled = :cancelled", { cancelled: false })
            .getOne()
            
        return existingReservation === null
    }
}