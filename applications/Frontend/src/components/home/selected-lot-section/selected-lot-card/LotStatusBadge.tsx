interface LotStatusBadgeProps {
    available: boolean
}

const LotStatusBadge: React.FC<LotStatusBadgeProps> = ({ available }) => {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                available
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-200 text-slate-600"
            }`}
        >
            {available ? "Disponible" : "Occupée"}
        </span>
    )
}

export default LotStatusBadge