import { NextFunction, Request, Response } from "express";
import { ReservationService } from "../services/Reservation.service";
import { AController } from "./AController";
export class ReservationController extends AController {

    constructor(
        private readonly reservationService: ReservationService,
    ) {
        super()
        this.router.post("/", this.createReservation)
        this.router.get("/parking-lots/:id", this.getCheckedInByParkingLot)
    }

    private createReservation = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { employeeId, parkingLotId, startDate, endDate } = req.body;

            const reservations = await this.reservationService.createReservation({
                employeeId,
                parkingLotId,
                startDate,
                endDate
            })

            return res.status(201).json(reservations)

        } catch (error) {
            next(error)
        }
    }

    private getCheckedInByParkingLot = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const reservations = await this.reservationService.getCheckedInByParkingLot(+id);

            return res.status(200).json(reservations);

        } catch (error) {
            next(error)
        }
    }
}