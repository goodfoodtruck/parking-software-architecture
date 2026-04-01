import { Reservation } from "../../../entities/Reservation.entity"
import { IParkingLotReservationRepository } from "../../../repositories/IParkingLotReservationRepository"

export class InMemoryReservationRepository implements IParkingLotReservationRepository {
    private reservations: Reservation[] = []
    private idCounter = 1

    constructor(initialData: Reservation[] = []) {
        this.reservations = initialData
        this.idCounter = initialData.length + 1
    }

    async findById(id: number): Promise<Reservation | null> {
        return this.reservations.find(r => r.id === id) || null;
    }

    async save(reservation: Reservation): Promise<Reservation> {
        reservation.id = this.idCounter++
        this.reservations.push(reservation)
        return reservation
    }

    async findByParkingLotId(id: number): Promise<Reservation | null> {
        return this.reservations.find(r => r.parkingLot.id === id) || null
    }

    async findCheckedInByParkingLotId(id: number): Promise<Reservation[]> {
        return this.reservations.filter(r =>
            r.parkingLot.id === id
            && r.checkedIn === true
        )
    }

    async isAvailable(parkingLotId: number, startDate: Date, endDate: Date): Promise<boolean> {
        const existingReservation = this.reservations.find(r =>
            r.parkingLot.id === parkingLotId
            && r.startDate <= endDate
            && r.endDate >= startDate
        )

        return existingReservation === undefined
    }

    add(reservation: Reservation) {
        this.reservations.push(reservation)
    }
}