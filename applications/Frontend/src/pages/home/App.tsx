import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/userSlice";
import { fetchParkingPlaces, parkingPlacesData } from "@/store/slices/parkingSlice";

const HomeApp = () => {
  const dispatch = useAppDispatch();
  const parkingLots = useAppSelector((state) => state.parking.parkingPlaces);
  const userProfile = useAppSelector((state) => state.auth.user);
  const [selectedLotId, setSelectedLotId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchParkingPlaces());
  }, [dispatch]);

  const selectedLot = parkingLots.find((lot) => lot.id === selectedLotId) ?? null;
  const isElectricUser = userProfile?.electric ?? false;
  const [reservationDate, setReservationDate] = useState<string>('');
  const today = new Date().toISOString().split('T')[0];

  const handleReservation = () => {

    console.log('coucou', reservationDate);
  };

  const lotByName = useMemo(() => {
    const map = new Map<string, parkingPlacesData>();
    parkingLots.forEach((lot) => map.set(lot.name, lot));
    return map;
  }, [parkingLots]);

  const rows = ["A", "B", "C", "D", "E", "F"];
  const columns = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl shadow-slate-200">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-600 p-8 text-white shadow-lg">
            <h1 className="text-3xl font-semibold">Mon vehicule & réservation</h1>
            <p className="mt-3 max-w-2xl text-slate-100">
              Consultez les places compatibles avec votre véhicule.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex flex-col gap-2 text-sm text-slate-100">
                Date de réservation
                <input
                  type="date"
                  value={reservationDate}
                  min={today}
                  onChange={(event) => setReservationDate(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                />
              </label>
              <button
                type="button"
                onClick={handleReservation}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Réserver une place de parking
              </button>
            </div>
          </div>

        {userProfile ? (
            <>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-800">Place sélectionnée</h2>
              <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
                {selectedLot ? (
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
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">Sélectionnez une place dans la carte pour voir les détails.</p>
                    <div className="grid gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">Disponible</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-slate-600">Occupée</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800">Électrique</span>
                      {!userProfile.electric && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-500">Non compatible</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Carte des places</h2>
                <p className="mt-1 text-sm text-slate-600">Cliquez sur une place disponible et compatible pour la sélectionner.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">Disponible</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-slate-600">Occupée</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800">Électrique</span>
                {!isElectricUser && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-500">Pas compatible</span>
                )}
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
                      const electric = lot?.isElectric ?? false;
                      const nonCompatible = !isElectricUser && electric;
                      const disabled = !available || nonCompatible;

                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            if (!disabled) setSelectedLotId(lot?.id ?? null);
                          }}
                          disabled={disabled}
                          className={`relative min-h-[64px] rounded-3xl border px-3 py-3 text-center text-sm font-semibold transition-all ${disabled ? 'cursor-not-allowed border-slate-200 bg-slate-200 text-slate-500' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'} ${selectedLotId === lot?.id ? 'ring-2 ring-sky-500' : ''}`}
                        >
                          <div>{name}</div>
                          <div className={`mt-2 text-xs ${electric ? 'text-amber-800' : 'text-slate-500'}`}>
                            {electric ? '⚡ Élec' : 'Auto'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>
</>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
            Aucun profil n'est connecté...
          </div>
        )}


        </div>
      </div>
    </div>
  );
};

export default HomeApp;
