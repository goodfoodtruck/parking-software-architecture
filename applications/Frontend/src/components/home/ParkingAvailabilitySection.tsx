import { useEffect, useState } from "react"
import { IParkingLotData } from "@/store/slices/parkingSlice"
import ParkingLotGrid from "./parking-map-section/ParkingLotGrid"
import SelectedLotSection from "./selected-lot-section/SelectedLotSection"
import { getAvailableParkingLots } from "@/services/parking/ParkingAvailabilityService"
import ParkingGridHeader from "./parking-map-section/ParkingGridHeader"

interface Props {
    parkingLots: IParkingLotData[]
    isElectricUser: boolean
    isUserManager: boolean
    dateRange: { start: string; end: string }
}

const ParkingAvailabilitySection: React.FC<Props> = ({
    parkingLots,
    isElectricUser,
    isUserManager,
    dateRange
}) => {
    const [availableLots, setAvailableLots] = useState<IParkingLotData[]>([])
    const [selectedLotId, setSelectedLotId] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAvailability = async () => {
            setLoading(true)
            const data = await getAvailableParkingLots(
                parkingLots,
                dateRange.start,
                dateRange.end
            )
            setAvailableLots(data)
            setSelectedLotId(null)
            setLoading(false)
        }

        fetchAvailability()
    }, [dateRange, parkingLots])

    const selectedLot = availableLots.find((l) => l.id === selectedLotId) ?? null

    const parkingLotsByName = new Map<string, IParkingLotData>()
    availableLots.forEach((lot) => parkingLotsByName.set(lot.name, lot))

    if (loading) return <div>Chargement des disponibilités...</div>

    return (
        <>
            {selectedLot && (
                <SelectedLotSection
                    selectedLot={selectedLot}
                    isUserManager={isUserManager}
                />
            )}
            <div className="flex flex-col rounded-lg shadow-sm p-6 gap-6">
                <ParkingGridHeader isElectricUser={isElectricUser}/>

                <ParkingLotGrid
                    parkingLotsByName={parkingLotsByName}
                    selectedLotId={selectedLotId}
                    isElectricUser={isElectricUser}
                    onSelect={setSelectedLotId}
                />
            </div>
        </>
    )
}

export default ParkingAvailabilitySection