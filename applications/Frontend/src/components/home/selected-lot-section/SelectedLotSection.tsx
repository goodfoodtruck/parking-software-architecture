import { parkingPlacesData } from "@/store/slices/parkingSlice"

interface SelectedLotSectionProps {
    selectedLot: parkingPlacesData
}

const SelectedLotSection: React.FC<SelectedLotSectionProps> = ({ selectedLot }) => {
    return (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-800">Place sélectionnée</h2>
                <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
                    <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-2xl font-semibold text-slate-900">{selectedLot.name}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedLot.available ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                        {selectedLot.available ? 'Disponible' : 'Occupée'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800">
                        ⚡ {selectedLot.isElectric ? 'Électrique' : 'Non électrique'}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600">
                        Cette place est compatible avec votre véhicule.
                    </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SelectedLotSection