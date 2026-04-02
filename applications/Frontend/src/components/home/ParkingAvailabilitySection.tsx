import { useEffect, useState } from "react"
import { IParkingLotData } from "@/store/slices/parkingSlice"
import ParkingLotGrid from "./parking-map-section/ParkingLotGrid"
import SelectedLotSection from "./selected-lot-section/SelectedLotSection"
import ParkingGridHeader from "./parking-map-section/ParkingGridHeader"
import ParkingService from "@/services/parking/parkingService"

interface Props {
    parkingLots: IParkingLotData[]
    isElectricCarUser: boolean
    dateRange: { start: string; end: string }
}

const ParkingAvailabilitySection: React.FC<Props> = ({
    parkingLots,
    isElectricCarUser,
    dateRange
}) => {
    const [availableLots, setAvailableLots] = useState<IParkingLotData[]>([])
    const [selectedLotId, setSelectedLotId] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAvailability = async () => {
            setLoading(true)
            const response = await ParkingService.getParkingLots({
                startDate: dateRange.start,
                endDate: dateRange.end
            })
            setAvailableLots(response.data)
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
                    selectedDateRange={dateRange}
                />
            )}
            <div className="flex flex-col rounded-lg shadow-sm p-6 gap-6">
                <ParkingGridHeader isElectricCarUser={isElectricCarUser}/>

                <ParkingLotGrid
                    parkingLotsByName={parkingLotsByName}
                    selectedLotId={selectedLotId}
                    isElectricCarUser={isElectricCarUser}
                    onSelect={setSelectedLotId}
                />
            </div>
        </>
    )
}

export default ParkingAvailabilitySection