import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchCurrentUser } from "@/store/slices/userSlice"
import { fetchParkingPlaces, parkingPlacesData } from "@/store/slices/parkingSlice"
import ParkingLotGrid from "@/components/home/parking-map-section/ParkingLotGrid"
import SelectedLotSection from "@/components/home/selected-lot-section/SelectedLotSection"

const HomeApp = () => {
    const dispatch = useAppDispatch()
    const parkingLots = useAppSelector((state) => state.parking.parkingPlaces)
    const userProfile = useAppSelector((state) => state.auth.user)
    const [selectedLotId, setSelectedLotId] = useState<number | null>(null)

    useEffect(() => {
        dispatch(fetchCurrentUser())
        dispatch(fetchParkingPlaces())
    }, [dispatch])

    if (! userProfile) {
        return (
            <div className="w-max p-2 rounded-md bg-red-500 text-white">Vous devez être connecté.</div>
        )
    }

    const selectedLot = parkingLots.find((lot) => lot.id === selectedLotId) ?? null
    const parkingLotsByName = new Map<string, parkingPlacesData>()
    parkingLots.forEach((lot) => parkingLotsByName.set(lot.name, lot))
    
    return (
        <div className="flex flex-col gap-2 min-h-screen bg-slate-100 px-6 py-8">
            { selectedLot && <SelectedLotSection selectedLot={selectedLot}/> }
            <div className="mx-auto w-full rounded-3xl bg-white p-8 shadow-xl shadow-slate-200">
                <ParkingLotGrid
                    parkingLotsByName={parkingLotsByName}
                    selectedLotId={selectedLotId}
                    isElectricUser={userProfile.electric}
                    onSelect={setSelectedLotId}
                />
            </div>
        </div>
    )
}

export default HomeApp