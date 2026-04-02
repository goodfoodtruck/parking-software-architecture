import type { UserData } from '@/store/slices/userSlice';

interface EmployeeTableProps {
  employees: UserData[];
  onEdit: (employee: UserData) => void;
}

const EmployeeTable = ({ employees, onEdit }: EmployeeTableProps) => {
  if (employees.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-6 text-sm text-slate-600 shadow-sm">
        Aucun employé à afficher.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Téléphone</th>
            <th className="px-4 py-3">Automobile</th>
            <th className="px-4 py-3">Électrique</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => onEdit(employee)}
            >
              <td className="px-4 py-4">{employee.firstName} {employee.lastName}</td>
              <td className="px-4 py-4 text-slate-600">{employee.email}</td>
              <td className="px-4 py-4 text-slate-600">{employee.phone}</td>
              <td className="px-4 py-4 text-slate-600">{employee.automobile}</td>
              <td className="px-4 py-4 text-slate-600">{employee.electric ? 'Oui' : 'Non'}</td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(employee);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-200"
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
