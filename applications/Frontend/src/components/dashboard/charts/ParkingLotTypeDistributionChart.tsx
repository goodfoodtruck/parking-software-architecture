import { ChartOptions } from "chart.js"
import { Pie } from "react-chartjs-2"

interface ParkingLotTypeDistributionChartProps {
  electricLots?: number
  totalLots?: number
}

const ParkingLotTypeDistributionChart: React.FC<ParkingLotTypeDistributionChartProps> = ({
    electricLots = 20,
    totalLots = 60
}) => {
    const electricPercentage = (electricLots / totalLots) * 100
    const nonElectricPercentage = 100 - electricPercentage

    const data = {
        labels: ["Électriques", "Autres"],
        datasets: [
            {
                label: "Répartition des types de places",
                data: [electricPercentage, nonElectricPercentage],
                backgroundColor: ["#34D399", "#60A5FA"],
                borderColor: ["#10B981", "#3B82F6"],
                borderWidth: 1,
            }
        ]
    }

    const options: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#374151",
                    font: { size: 12 }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label} : ${(context.raw as number).toFixed(0)}%`
                },
            }
        }
    }

    return (
        <div className="w-72 h-72 mx-auto">
            <Pie data={data} options={options} width={150} height={150} />
        </div>
    )
}

export default ParkingLotTypeDistributionChart