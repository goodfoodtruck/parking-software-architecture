import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { ParkingLot } from "../entities/ParkingLot.entity";

export class ParkingLotController {
    private parkingLotRepository = AppDataSource.getRepository(ParkingLot);

    async getParkingLots(req: Request, res: Response) {
        const parkingLots = await this.parkingLotRepository.find();
        return res.status(200).json(parkingLots);
    }
}