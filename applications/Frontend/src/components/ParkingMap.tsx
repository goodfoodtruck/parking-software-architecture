import { ParkingLot } from "../pages/profil/types";

type Props = {
  parkingLots: ParkingLot[];
  selectedLotId: number | null;
  onSelectLot: (id: number) => void;
};

const ParkingMap = ({ parkingLots, selectedLotId, onSelectLot }: Props) => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  const columns = Array.from({ length: 10 }, (_, index) => index + 1);
  const lotByName = new Map<string, ParkingLot>();
  parkingLots.forEach((lot) => lotByName.set(lot.name, lot));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Carte des places</h2>
          <p className="mt-1 text-sm text-slate-600">Cliquez sur une place disponible pour la sélectionner.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">Disponible</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-slate-600">Occupée</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800">Électrique</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row} className="grid grid-cols-[64px_repeat(10,minmax(0,1fr))] items-center gap-3">
              <div className="text-sm font-semibold text-slate-700">{row}</div>
              {columns.map((col) => {
                const name = `${row}${String(col).padStart(2, '0')}`;
                const lot = lotByName.get(name);
                const available = lot?.available ?? false;
                const electric = lot?.electric ?? false;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      if (lot?.available) onSelectLot(lot.id);
                    }}
                    disabled={!available}
                    className={`relative min-h-[64px] rounded-3xl border px-3 py-3 text-center text-sm font-semibold transition-all ${available ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-400' : 'cursor-not-allowed border-slate-200 bg-slate-200 text-slate-500'} ${selectedLotId === lot?.id ? 'ring-2 ring-sky-500' : ''}`}
                  >
                    <div>{name}</div>
                    <div className="mt-2 text-xs text-slate-500">{electric ? '⚡ Élec' : 'Auto'}</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParkingMap;
