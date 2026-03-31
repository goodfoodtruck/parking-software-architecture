import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Employee } from "../entities/Employee.entity";
import { ParkingLot } from "../entities/ParkingLot.entity";
import { Reservation } from "../entities/Reservation.entity";
import { ReservationService } from "../services/Reservation.service";

export class ReservationController {
    private reservationRepository = AppDataSource.getRepository(Reservation);
    private employeeRepository = AppDataSource.getRepository(Employee);
    private parkingLotRepository = AppDataSource.getRepository(ParkingLot);
    private reservationService = new ReservationService();

    async createReservation(req: Request, res: Response) {
        try {
            const { employeeId, parkingLotId, startDate, endDate } = req.body;

            const employee = await this.employeeRepository.findOneBy({ id: employeeId });
            const parkingLot = await this.parkingLotRepository.findOneBy({ id: parkingLotId });

            if (! employee || ! parkingLot) {
                return res.status(404).json({ message: "Employee or ParkingLot not found" });
            }

            const available = this.reservationService.isAvailable(parkingLot, startDate, endDate);

            if (! available) {
                return res.status(400).json({ message: "La place est indisponible" });
            }

            const reservation = this.reservationRepository.create({
                employee: employeeId,
                parkingLot: parkingLotId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                checkedIn: false
            });

            await this.reservationRepository.save(reservation);

            return res.status(201).json(reservation);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}