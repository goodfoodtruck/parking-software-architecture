import { IParkingLotData } from "@/store/slices/parkingSlice"
import LotHeader from "./LotHeader"
import LotElectricBadge from "./LotElectricBadge"
import { Button } from "@/components/ui/button"

interface SelectedLotCardProps {
    lot: IParkingLotData
}

const SelectedLotCard: React.FC<SelectedLotCardProps> = ({ lot }) => {
    return (
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex flex-col space-y-3">
                <LotHeader lot={lot} />

                <div className="flex items-center gap-2 text-sm text-slate-700">
                    <LotElectricBadge isElectric={lot.isElectric} />
                </div>

                <p className="text-sm text-slate-600">
                    Cette place est compatible avec votre véhicule.
                </p>

                <Button className="bg-blue-600 hover:bg-blue-700 self-end">Réserver cette place</Button>
            </div>
        </div>
    )
}

export default SelectedLotCard