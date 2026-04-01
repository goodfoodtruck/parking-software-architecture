import { ParkingLot } from "../../../entities/ParkingLot.entity"
import { Reservation } from "../../../entities/Reservation.entity"
import { IParkingLotReservationRepository } from "../../../repositories/IParkingLotReservationRepository"

export class InMemoryReservationRepository implements IParkingLotReservationRepository {
    private reservations: Reservation[] = []
    private idCounter = 1

    constructor(initialData: Reservation[] = []) {
        this.reservations = initialData
        this.idCounter = initialData.length + 1
    }

    async save(reservation: Reservation): Promise<Reservation> {
        reservation.id = this.idCounter++
        this.reservations.push(reservation)
        return reservation
    }

    async findByParkingLotId(id: number): Promise<Reservation | null> {
        return this.reservations.find(r => r.parkingLot.id === id) || null
    }

    async isAvailable(parkingLot: ParkingLot, startDate: Date, endDate: Date): Promise<boolean> {
        const overlap = this.reservations.find(r =>
            r.parkingLot.id === parkingLot.id
            && r.startDate <= endDate
            && r.endDate >= startDate
        )

        return overlap === undefined
    }

    add(reservation: Reservation) {
        this.reservations.push(reservation)
    }
}