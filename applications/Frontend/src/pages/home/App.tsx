import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchCurrentUser } from "@/store/slices/userSlice"
import { fetchParkingPlaces } from "@/store/slices/parkingSlice"
import ParkingAvailabilitySection from "@/components/home/ParkingAvailabilitySection"
import DateRangePicker from "@/components/home/selected-lot-section/selected-lot-reservation/DateRangePicker"

const HomeApp = () => {
    const dispatch = useAppDispatch()
    const parkingLots = useAppSelector((state) => state.parking.parkingPlaces)
    const userProfile = useAppSelector((state) => state.auth.user)

    const [dateRange, setDateRange] = useState<{
        start: string
        end: string
    } | null>(null)

    useEffect(() => {
        dispatch(fetchCurrentUser())
        dispatch(fetchParkingPlaces())
    }, [dispatch])

    if (!userProfile) {
        return <div>Vous devez être connecté</div>
    }

    const isUserManager = userProfile.role === "MANAGER"

    return (
        <div className="flex flex-col gap-6 p-6">
            <DateRangePicker onChange={setDateRange} maxRangeInDays={isUserManager ? 30 : 5} />

            {dateRange && (
                <ParkingAvailabilitySection
                    parkingLots={parkingLots}
                    isElectricUser={userProfile.electric}
                    isUserManager={isUserManager}
                    dateRange={dateRange}
                />
            )}
        </div>
    )
}

export default HomeApp