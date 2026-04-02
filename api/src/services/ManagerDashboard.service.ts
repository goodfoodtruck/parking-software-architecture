import { ParkingMetricsDTO } from "../dtos/out/ParkingMetricsDTO";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class ManagerDashboardService {
    constructor(
        private readonly reservationRepository: IParkingLotReservationRepository
    ) {}

    async getParkingMetrics(): Promise<ParkingMetricsDTO> {
        return {
            last30DaysNbReservations: [],
            nbElectricLots: 20
        }
    }
}