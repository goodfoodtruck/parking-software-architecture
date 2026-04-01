import ParkingAverageUsage from "@/components/dashboard/ParkingAverageUsage"
import ParkingDailyVisitsChart from "@/components/dashboard/charts/ParkingDailyVisitsChart"
import ParkingLotTypeDistributionChart from "@/components/dashboard/charts/ParkingLotTypeDistributionChart"
import CheckedInReservationPercentage from "@/components/dashboard/CheckedInReservationPercentage"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ManagerDashboard: React.FC = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend,
        ArcElement
    )

    const mocks = Array.from({ length: 30 }, () => Math.floor(Math.random() * 61))

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                Tableau de bord – Gestion du parking
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Visites quotidiennes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ParkingDailyVisitsChart last30DaysNbReservations={mocks} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Taux moyen et check-in</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <ParkingAverageUsage last30DaysNbReservations={mocks} />
                        <CheckedInReservationPercentage checkedInPercentage={28} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Répartition par type de place</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ParkingLotTypeDistributionChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ManagerDashboard