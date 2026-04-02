import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { format } from "date-fns"
import DateRangeSummary from "./DateRangeSummary"

interface Props {
    onChange: (range: { start: string; end: string } | null) => void
    maxRangeInDays: number
}

const DateRangePicker: React.FC<Props> = ({
    onChange,
    maxRangeInDays
}) => {
    const [range, setRange] = useState<DateRange | undefined>()
    const [error, setError] = useState<string | null>(null)

    const getDiffInDays = (from: Date, to: Date) => {
        const diff = to.getTime() - from.getTime()
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }

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
            const diff = getDiffInDays(selected.from, selected.to)

            if (diff > maxRangeInDays) {
                setError(`Maximum ${maxRangeInDays} jours`)
                return
            }

            setError(null)

            const formatted = {
                start: format(selected.from, "yyyy-MM-dd"),
                end: format(selected.to, "yyyy-MM-dd")
            }

            onChange(formatted)
        }

        setRange(selected)
    }

     const handleReset = () => {
        setRange(undefined)
        setError(null)
        onChange(null)
    }

    return (
        <div className="flex gap-6 items-stretch">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    pagedNavigation
                    disabled={{ before: new Date() }}
                />
            </div>

            <DateRangeSummary
                range={range}
                error={error}
                maxRangeInDays={maxRangeInDays}
                onReset={handleReset}
            />
        </div>
    )
}

export default DateRangePicker