import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface Props {
    range: DateRange | undefined
    error: string | null
    onReset: () => void
}

const getDiffInDays = (from: Date, to: Date) => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24
    return Math.ceil((to.getTime() - from.getTime()) / millisecondsPerDay)
}

const DateRangeSummary: React.FC<Props> = ({ range, error, onReset }) => {
    if (!range?.from) {
        return (
            <p className="text-sm text-slate-400">
                Aucune période sélectionnée
            </p>
        )
    }

    const startDate = format(range.from, "dd/MM/yyyy")
    const endDate = range.to ? format(range.to, "dd/MM/yyyy") : null
    const duration = range.to ? getDiffInDays(range.from, range.to) + 1 : null

    return (
        <div className="flex items-center justify-between text-sm gap-4">
            <div className="text-slate-700">
                {endDate ? (
                    <>
                        {startDate} → {endDate} •{" "}
                        <span className="font-medium">{duration} jours</span>
                    </>
                ) : (
                    <>Début : {startDate}</>
                )}
            </div>

            <div className="flex items-center gap-3">
                {error && <span className="text-red-500 text-xs">{error}</span>}

                <button
                    onClick={onReset}
                    className="text-xs text-blue-600 hover:underline"
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    )
}

export default DateRangeSummary