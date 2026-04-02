import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IReservationPlaceBody } from "@/store/slices/reservationSlice"
import ReservationService from "@/services/reservation/reservationService"

interface CreateReservationButtonProps {
    payload: IReservationPlaceBody
    disabled?: boolean
    onSuccess?: () => void
}

const CreateReservationButton: React.FC<CreateReservationButtonProps> = ({
    payload,
    disabled,
    onSuccess
}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleReserve = async () => {
        try {
            setLoading(true)
            setError(null)

            await ReservationService.reserveParkingPlace(payload)

            onSuccess?.()
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erreur lors de la réservation")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-end gap-2">
            <Button
                onClick={handleReserve}
                disabled={disabled || loading}
                className="bg-blue-600 hover:bg-blue-700"
            >
                {loading ? "Réservation..." : "Réserver cette place"}
            </Button>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}

export default CreateReservationButton