import { Reservation } from "../entities/Reservation.entity";

export interface IParkingLotReservationRepository {
    save(reservation: Reservation): Promise<Reservation>
    findById(id: number): Promise<Reservation | null>
    findByParkingLotId(id: number): Promise<Reservation | null>
    isAvailable(parkingLotId: number, startDate: Date, endDate: Date): Promise<boolean>
    findCheckedInByParkingLotId(id: number): Promise<Reservation[]>
}