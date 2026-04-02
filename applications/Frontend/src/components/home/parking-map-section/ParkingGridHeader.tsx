interface ParkingGridHeaderProps {
    isElectricUser: boolean
}

const ParkingGridHeader: React.FC<ParkingGridHeaderProps> = ({ isElectricUser }) => {
    return (
        <div className="flex flex-wrap gap-3">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Disponible
            </span>
            <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-sm">
                Occupée
            </span>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                Électrique
            </span>

            {!isElectricUser && (
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-sm">
                    Pas compatible
                </span>
            )}
        </div>
    )
}

export default ParkingGridHeader