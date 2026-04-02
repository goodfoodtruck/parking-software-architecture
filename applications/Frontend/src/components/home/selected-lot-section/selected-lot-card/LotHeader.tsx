import { IParkingLotData } from "@/store/slices/parkingSlice"
import LotStatusBadge from "./LotStatusBadge"

interface LotHeaderProps {
    lot: IParkingLotData
}

const LotHeader: React.FC<LotHeaderProps> = ({ lot }) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-2xl font-semibold text-slate-900">
                {lot.name}
            </span>

            <LotStatusBadge available={lot.available} />
        </div>
    )
}

export default LotHeader