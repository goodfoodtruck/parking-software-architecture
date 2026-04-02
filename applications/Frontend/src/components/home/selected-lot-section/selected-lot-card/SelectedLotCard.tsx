import { IParkingLotData } from "@/store/slices/parkingSlice"
import LotHeader from "./LotHeader"
import LotElectricBadge from "./LotElectricBadge"
import CreateReservationButton from "./CreateReservationButton"
import { useAppSelector } from "@/store/hooks"

interface SelectedLotCardProps {
    lot: IParkingLotData
    selectedDateRange: { start: string; end: string }
}

const SelectedLotCard: React.FC<SelectedLotCardProps> = ({ lot, selectedDateRange }) => {
    const userProfile = useAppSelector((state) => state.auth.user)
    
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

                <CreateReservationButton
                    payload={{
                        employeeId: userProfile!.id!,
                        parkingLotId: lot.id,
                        startDate: new Date(selectedDateRange.start),
                        endDate: new Date(selectedDateRange.end)
                    }}
                    disabled={! lot.available}
                    onSuccess={() => {
                        console.log("Réservation réussie")
                    }}
                />
            </div>
        </div>
    )
}

export default SelectedLotCard