import { Reservation } from "../entities/Reservation.entity";

export interface IParkingLotReservationRepository {
    save(reservation: Reservation): Promise<Reservation>
    findAll(): Promise<Reservation[]>
    findById(id: number): Promise<Reservation | null>
    findByParkingLotId(id: number): Promise<Reservation | null>
    isAvailable(parkingLotId: number, dates: Date[]): Promise<boolean>
    findCheckedInByParkingLotId(id: number): Promise<Reservation[]>
}