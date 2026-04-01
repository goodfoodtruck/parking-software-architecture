import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CheckedInReservationPercentageProps {
  checkedInPercentage: number
}

const CheckedInReservationPercentage: React.FC<CheckedInReservationPercentageProps> = ({ checkedInPercentage }) => {
    const clampedPercentage = Math.min(Math.max(checkedInPercentage, 0), 100)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-sm text-gray-700">Taux de check-in effectués</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Progress value={clampedPercentage} className="h-3 rounded-full" />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{clampedPercentage.toFixed(0)}%</span>
                    <span>100%</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default CheckedInReservationPercentage