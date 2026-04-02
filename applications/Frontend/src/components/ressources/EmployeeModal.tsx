import { ChangeEvent } from 'react';
import { UserCreation } from '../../pages/resources/App';

interface EmployeeModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  form: UserCreation;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
  submitting: boolean;
  feedback: string | null;
}

const EmployeeModal = ({
  open,
  mode,
  form,
  onChange,
  onClose,
  onSubmit,
  submitting,
  feedback,
}: EmployeeModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {mode === 'create' ? 'Créer un nouvel utilisateur' : 'Modifier un employé'}
            </h2>
            <p className="text-sm text-slate-600">
              {mode === 'create'
                ? 'Renseignez les informations du nouvel utilisateur.'
                : 'Mettez à jour les informations et enregistrez.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Prénom
            <input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Nom
            <input
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Téléphone
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Automobile
            <input
              name="automobile"
              value={form.automobile}
              onChange={onChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-700 sm:col-span-2">
            <input
              type="checkbox"
              name="electric"
              checked={form.electric}
              onChange={onChange}
              className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            Véhicule électrique
          </label>
        </div>

        {feedback && (
          <div className="mt-6 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
            {feedback}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {mode === 'create' ? (submitting ? 'Création...' : 'Créer l’utilisateur') : (submitting ? 'Enregistrement...' : 'Enregistrer')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
