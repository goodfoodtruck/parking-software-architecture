import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface Props {
    range: DateRange | undefined
    error: string | null
    maxRangeInDays: number
    onReset: () => void
}

const getDiffInDays = (from: Date, to: Date) => {
    const diff = to.getTime() - from.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const DateRangeSummary: React.FC<Props> = ({
    range,
    error,
    onReset
}) => {
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
                Période sélectionnée
            </h3>

            {!range?.from && (
                <p className="text-sm text-slate-400"> Aucune date sélectionnée </p>
            )}

            {range?.from && !range?.to && (
                <p className="text-sm text-slate-500">
                    Début : {format(range.from, "dd/MM/yyyy")}
                </p>
            )}

            {range?.from && range?.to && (
                <div className="text-sm text-slate-700 space-y-1">
                    <p>Du {format(range.from, "dd/MM/yyyy")}</p>
                    <p>Au {format(range.to, "dd/MM/yyyy")}</p>
                    <p className="text-xs text-slate-400">
                        {getDiffInDays(range.from, range.to) + 1} jour(s)
                    </p>
                </div>
            )}

            {error && <p className="text-sm text-red-500 mt-2"> {error} </p> }

            {range && (
                <button
                    onClick={onReset}
                    className="mt-3 text-xs text-blue-600 hover:underline"
                >
                    Réinitialiser
                </button>
            )}
        </div>
    )
}

export default DateRangeSummary