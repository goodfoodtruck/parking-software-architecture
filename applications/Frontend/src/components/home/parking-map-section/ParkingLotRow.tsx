import { parkingPlacesData } from "@/store/slices/parkingSlice"
import ParkingLotCell from "./ParkingLotCell"

interface ParkingLotRowProps {
    row: string
    columns: number[]
    lotByName: Map<string, parkingPlacesData>
    selectedLotId: number | null
    isElectricUser: boolean
    onSelect: (id: number | null) => void
}

const ParkingLotRow: React.FC<ParkingLotRowProps> = ({
    row,
    columns,
    lotByName,
    selectedLotId,
    isElectricUser,
    onSelect
}) => {
    return (
        <div className="grid grid-cols-[64px_repeat(10,minmax(0,1fr))] items-center gap-3">
            <div className="text-sm font-semibold text-slate-700">{row}</div>

            {columns.map((col) => {
                const name = `${row}${String(col).padStart(2, "0")}`
                const lot = lotByName.get(name)

                return lot && (
                    <ParkingLotCell
                        key={name}
                        name={name}
                        lot={lot}
                        isSelected={selectedLotId === lot?.id}
                        isElectricUser={isElectricUser}
                        onSelect={onSelect}
                    />
                )
            })}
        </div>
    )
}

export default ParkingLotRow