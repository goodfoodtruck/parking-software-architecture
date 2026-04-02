import { NextFunction, Request, Response } from "express";
import { AController } from "./AController";
import { ManagerDashboardService } from "../services/ManagerDashboard.service";

export class ManagerDashboardController extends AController {
    constructor(
        private readonly service: ManagerDashboardService
    ) {
        super()
        this.router.get("/", this.getParkingMetrics)
    }

    private getParkingMetrics = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const metrics = await this.service.getParkingMetrics()

            return res.status(200).json(metrics)
        }
        catch(error) {
            next(error)
        }
    }
}