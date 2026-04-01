import { ParkingLot } from "../entities/ParkingLot.entity";

export interface IParkingLotRepository {
    findById(id: number): Promise<ParkingLot | null>
    findAll(): Promise<ParkingLot[] | null>
}