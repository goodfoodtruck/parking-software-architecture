import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { ParkingLot } from "../entities/ParkingLot.entity";
import { ParkingLotAvailableDto } from "./dtos/parking-lots/ParkingLotAvailable.dto";
import { ReservationService } from "../services/Reservation.service";
import { TypeORMParkingLotRepository } from "../infrastructure/repositories/typeorm/TypeORMParkingLotRepository";
import { TypeORMParkingLotReservationRepository } from "../infrastructure/repositories/typeorm/TypeORMParkingLotReservationRepository";

export class ParkingLotController {
        private parkingLotRepository = AppDataSource.getRepository(ParkingLot);
        private reservationService = new ReservationService(
            new TypeORMParkingLotRepository(),
            new TypeORMParkingLotReservationRepository()
        );

    async getParkingLots(req: Request, res: Response) {
        const parkingLotsEntities = await this.parkingLotRepository.find();
        const parkingLotsDTO: ParkingLotAvailableDto[] = [];

        for (const parkingLot of parkingLotsEntities) {
            const isAvailable = await this.reservationService.isAvailable(
                parkingLot, new Date(Date.now()), new Date(Date.now())
            )
            parkingLotsDTO.push({
                id: parkingLot.id,
                name: parkingLot.name,
                electric: parkingLot.electric,
                available: isAvailable
            });
        }
        
        return res.status(200).json(parkingLotsDTO);
    }
}