import { useState } from "react"
import { DayPicker, DateRange } from "react-day-picker"
import { isWeekend, differenceInCalendarDays } from "date-fns"

interface Props {
    isManager: boolean
}

const ReservationDatePicker: React.FC<Props> = ({ isManager }) => {
    const [range, setRange] = useState<DateRange | undefined>()

    const maxDays = isManager ? 30 : 5

    const isInvalidRange = (range?: DateRange) => {
        if (!range?.from || !range?.to) return false

        const diff = differenceInCalendarDays(range.to, range.from) + 1
        return diff > maxDays
    }

    const disabledDays = (date: Date) => {
        if (date < new Date()) return true
        if (isWeekend(date)) return true

        return false
    }

    return (
        <div className="rounded-xl border p-4 bg-white">
            <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={disabledDays}
            />

            {isInvalidRange(range) && (
                <p className="text-red-500 text-sm mt-2">
                    Durée maximale dépassée ({maxDays} jours)
                </p>
            )}
        </div>
    )
}

export default ReservationDatePicker