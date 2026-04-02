import { Line } from "react-chartjs-2"

interface ParkingDailyVisitsChartProps {
    last30DaysNbReservations: number[]
}

const ParkingDailyVisitsChart: React.FC<ParkingDailyVisitsChartProps> = ({ last30DaysNbReservations }) => {
    const last30DaysDates: Date[] = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        date.setHours(0, 0, 0, 0)
        
        return date
    })
    
    const data = {
        labels: last30DaysDates.map((_, i) => {
            switch(i) {
                case 0: return "Aujourd'hui"
                case 1: return "Hier"
                default: return `Il y a ${i} jours`
            }
        }),
        datasets: [
            {
                label: "Nombre de réservations par jour",
                data: last30DaysNbReservations,
                borderColor: 'rgba(34, 197, 94, 0.7)',
                backgroundColor: 'rgba(34, 197, 94, 1)'
            }
        ]
    }

   return (
        <div className="w-full h-80">
            <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    )
}

export default ParkingDailyVisitsChart