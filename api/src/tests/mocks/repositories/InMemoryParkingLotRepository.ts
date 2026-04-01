import { ParkingLot } from "../../../entities/ParkingLot.entity"
import { IParkingLotRepository } from "../../../repositories/IParkingLotRepository"

export class InMemoryParkingLotRepository implements IParkingLotRepository {
    private parkingLots: ParkingLot[] = []

    constructor(initialData: ParkingLot[] = []) {
        this.parkingLots = initialData
    }

    async findAll(): Promise<ParkingLot[]> {
        return this.parkingLots
    }

    async findById(id: number): Promise<ParkingLot | null> {
        return this.parkingLots.find(p => p.id === id) || null
    }

    add(parkingLot: ParkingLot) {
        this.parkingLots.push(parkingLot)
    }
}