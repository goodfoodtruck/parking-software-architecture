import { Reservation } from "../entities/Reservation.entity";

export interface IParkingLotReservationRepository {
    save(reservation: Reservation): Promise<Reservation>
    findAll(): Promise<Reservation[]>
    findByParkingLotId(id: number): Promise<Reservation | null>
    isAvailable(parkingLotId: number, startDate: Date, endDate: Date): Promise<boolean>
}