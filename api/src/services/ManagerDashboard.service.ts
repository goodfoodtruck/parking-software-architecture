import { ParkingMetricsDTO } from "../dtos/out/ParkingMetricsDTO";
import { IParkingLotReservationRepository } from "../repositories/IParkingLotReservationRepository";

export class ManagerDashboardService {
    constructor(
        private readonly reservationRepository: IParkingLotReservationRepository
    ) {}

    async getParkingMetrics(): Promise<ParkingMetricsDTO> {
        const allReservations = await this.reservationRepository.findAll()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const d = new Date(today)
            d.setDate(today.getDate() - (29 - i))
            return d
        })

        const last30DaysNbReservations = last30Days.map(day => {
            return allReservations.filter(reservation => {
                const start = new Date(reservation.startDate)
                const end = new Date(reservation.endDate)

                return ((start <= day) && (end >= day))
            }).length
        })

        return {
            last30DaysNbReservations,
            nbElectricLots: 20
        }
    }
}