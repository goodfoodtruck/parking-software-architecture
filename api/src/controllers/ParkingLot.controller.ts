import { NextFunction, Request, Response } from "express";
import { AController } from "./AController";
import { ParkingLotService } from "../services/ParkingLot.service";

export class ParkingLotController extends AController {
    constructor(
        private readonly parkingLotService: ParkingLotService
    ) {
        super()
        this.router.get("/", this.getParkingLots)
    }

    private getParkingLots = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const parkingLots = await this.parkingLotService.getAll()
            return res.status(200).json(parkingLots)
        }
        catch(error) {
            next(error)
        }
    }
}