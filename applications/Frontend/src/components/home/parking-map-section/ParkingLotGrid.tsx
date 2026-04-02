import { IParkingLotData } from "@/store/slices/parkingSlice"
import ParkingLotRow from "./ParkingLotRow"

interface ParkingLotGridProps {
    parkingLotsByName: Map<string, IParkingLotData>
    selectedLotId: number | null
    isElectricUser: boolean
    onSelect: (id: number | null) => void
}

const ParkingLotGrid: React.FC<ParkingLotGridProps> = ({
    parkingLotsByName,
    selectedLotId,
    isElectricUser,
    onSelect
}) => {
    const rows = ["A", "B", "C", "D", "E", "F"]
    const columns = Array.from({ length: 10 }, (_, i) => i + 1)

    return (
        <div className="space-y-4">
            {rows.map((row) => (
                <ParkingLotRow
                    key={row}
                    row={row}
                    columns={columns}
                    lotByName={parkingLotsByName}
                    selectedLotId={selectedLotId}
                    isElectricUser={isElectricUser}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}

export default ParkingLotGrid