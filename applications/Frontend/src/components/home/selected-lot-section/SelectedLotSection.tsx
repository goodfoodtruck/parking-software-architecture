import { IParkingLotData } from "@/store/slices/parkingSlice"
import SelectedLotCard from "./selected-lot-card/SelectedLotCard"

interface SelectedLotSectionProps {
    selectedLot: IParkingLotData | null
    isUserManager: boolean
}

const SelectedLotSection: React.FC<SelectedLotSectionProps> = ({ selectedLot }) => {
    if (! selectedLot) return null

    return (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-800">
                    Place sélectionnée
                </h2>
                <SelectedLotCard lot={selectedLot} />
            </section>
        </div>
    )
}

export default SelectedLotSection