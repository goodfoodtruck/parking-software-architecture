interface LotElectricBadgeProps {
    isElectric: boolean
}

const LotElectricBadge: React.FC<LotElectricBadgeProps> = ({ isElectric }) => {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800">
            ⚡ {isElectric ? "Électrique" : "Non électrique"}
        </span>
    )
}

export default LotElectricBadge