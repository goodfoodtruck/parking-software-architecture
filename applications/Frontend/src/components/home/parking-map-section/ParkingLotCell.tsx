import { IParkingLotData } from "@/store/slices/parkingSlice"

interface ParkingLotCellProps {
    name: string
    lot: IParkingLotData
    isSelected: boolean
    isElectricCarUser: boolean
    onSelect: (id: number | null) => void
}

const ParkingLotCell: React.FC<ParkingLotCellProps> = ({
    name,
    lot,
    isSelected,
    isElectricCarUser,
    onSelect
}) => {
    const available = lot.available ?? false
    const electric = lot.isElectric ?? false

    const nonCompatible = !isElectricCarUser && electric
    const disabled = !available || nonCompatible

    return (
        <button
            type="button"
            onClick={() => !disabled && onSelect(lot.id ?? null)}
            disabled={disabled}
            className={`relative min-h-16 rounded-3xl border px-3 py-3 text-center text-sm font-semibold transition-all
                ${disabled
                    ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-500"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"}
                ${isSelected ? "ring-2 ring-sky-500" : ""}
            `}
        >
            <div>{name}</div>
            <div className={`mt-2 text-xs ${electric ? "text-amber-800" : "text-slate-500"}`}>
                {electric ? "⚡ Élec" : "Auto"}
            </div>
        </button>
    )
}

export default ParkingLotCell