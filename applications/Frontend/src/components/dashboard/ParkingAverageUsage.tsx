import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ParkingAverageUsageProps {
    last30DaysNbReservations: number[]
}

const ParkingAverageUsage: React.FC<ParkingAverageUsageProps> = ({ last30DaysNbReservations }) => {
    const totalReservations = last30DaysNbReservations.reduce((sum, value) => sum + value, 0)
    const averageUsage = totalReservations / last30DaysNbReservations.length
    const clampedPercentage = Math.min(Math.max(averageUsage, 0), 100)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-sm text-gray-700">Taux de fréquentation moyen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Progress value={clampedPercentage} className="h-3 rounded-full" />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{clampedPercentage.toFixed(0)}%</span>
                    <span>100%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                    Plus la barre est longue, plus le parking est utilisé.
                </p>
            </CardContent>
        </Card>
    )
}

export default ParkingAverageUsage