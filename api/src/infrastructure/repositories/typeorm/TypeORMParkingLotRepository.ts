import { AppDataSource } from "../../../config/db";
import { ParkingLot } from "../../../entities/ParkingLot.entity";
import { IParkingLotRepository } from "../../../repositories/IParkingLotRepository";

export class TypeORMParkingLotRepository implements IParkingLotRepository {

    private readonly repository = AppDataSource.getRepository(ParkingLot)
    
    findById(id: number): Promise<ParkingLot | null> {
        return this.repository.findOneBy({ id })
    }
}