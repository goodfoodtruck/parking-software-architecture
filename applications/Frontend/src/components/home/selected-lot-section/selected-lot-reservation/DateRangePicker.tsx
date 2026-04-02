import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { format } from "date-fns"
import DateRangeSummary from "./DateRangeSummary"

interface Props {
    onChange: (range: { start: string; end: string } | null) => void
    maxRangeInDays: number
    isManager?: boolean
}

const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
}

const getWorkingDays = (from: Date, to: Date) => {
    let count = 0
    const current = new Date(from)
    while (current <= to) {
        if (!isWeekend(current)) count++
        current.setDate(current.getDate() + 1)
    }
    return count
}

const DateRangePicker: React.FC<Props> = ({
    onChange,
    maxRangeInDays,
    isManager = false
}) => {
    const [range, setRange] = useState<DateRange | undefined>()
    const [hoveredDate, setHoveredDate] = useState<Date | undefined>()
    const [error, setError] = useState<string | null>(null)

    const handleSelect = (selected: DateRange | undefined) => {
        if (!selected?.from && !selected?.to) {
            handleReset()
            return
        }

        if (selected?.from && !selected?.to) {
            setRange(selected)
            onChange(null)
            return
        }

        if (selected?.from && selected?.to) {
            // Managers peuvent réserver jusqu'à 30 jours, ignore les week-ends
            if (!isManager) {
                const workingDays = getWorkingDays(selected.from, selected.to)
                if (workingDays > maxRangeInDays) {
                    setError(`Maximum ${maxRangeInDays} jours ouvrés`)
                    return
                }
                // empêche de finir sur un week-end
                if (isWeekend(selected.to)) {
                    setError("La réservation ne peut pas se terminer un week-end")
                    return
                }
            } else {
                // pour managers : maxRangeInDays = 30, on ne bloque pas les week-ends
                const diffDays =
                    Math.ceil(
                        (selected.to.getTime() - selected.from.getTime()) /
                            (1000 * 60 * 60 * 24)
                    ) + 1
                if (diffDays > maxRangeInDays) {
                    setError(`Maximum ${maxRangeInDays} jours`)
                    return
                }
            }

            setError(null)
            setRange(selected)
            onChange({
                start: format(selected.from, "yyyy-MM-dd"),
                end: format(selected.to, "yyyy-MM-dd")
            })
            return
        }

        setRange(selected)
    }

    const handleReset = () => {
        setRange(undefined)
        setHoveredDate(undefined)
        setError(null)
        onChange(null)
    }

    const previewRange =
        range?.from && hoveredDate
            ? {
                  from: range.from,
                  to: hoveredDate
              }
            : undefined

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-2xl border bg-white p-4 shadow-sm w-fit">
                <DayPicker
                    mode="range"
                    selected={range}
                    modifiers={{
                        preview: previewRange
                    }}
                    modifiersClassNames={{
                        preview: "bg-blue-100"
                    }}
                    onDayMouseEnter={setHoveredDate}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    pagedNavigation
                    disabled={(date) => {
                        if (date < new Date()) return true
                        if (!isManager && isWeekend(date)) return true
                        return false
                    }}
                />
                <DateRangeSummary
                    range={range}
                    error={error}
                    onReset={handleReset}
                />
            </div>
        </div>
    )
}

export default DateRangePicker