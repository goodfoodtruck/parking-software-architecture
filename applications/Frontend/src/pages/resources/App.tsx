import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllEmployees, type UserData } from "@/store/slices/userSlice";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";

export interface UserCreation {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  automobile: string;
  electric: boolean;
}


const initialCreationForm: UserCreation = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  automobile: "",
  electric: false,
};

const SecretaryApp = () => {
  const dispatch = useAppDispatch();
  const storeEmployees = useAppSelector((state) => state.auth.employees);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const [employees, setEmployees] = useState<UserData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedEmployee, setSelectedEmployee] = useState<UserData | null>(null);
  const [creationForm, setCreationForm] = useState<UserCreation>(initialCreationForm);
  const [editForm, setEditForm] = useState<UserCreation>(initialCreationForm);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    setEmployees(storeEmployees);
  }, [storeEmployees]);

  const openCreateModal = () => {
    setModalMode('create');
    setCreationForm(initialCreationForm);
    setFeedback(null);
    setSelectedEmployee(null);
    setModalOpen(true);
  };

  const openEditModal = (employee: UserData) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setEditForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      automobile: employee.automobile,
      electric: employee.electric,
    });
    setFeedback(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFeedback(null);
  };

  const handleCreationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setCreationForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setEditForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateUser = async () => {
    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/user/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creationForm),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Impossible de créer l’utilisateur');
      }

      const createdUser = await response.json();
      const newEmployee: UserData = {
        id: createdUser.id ?? Date.now(),
        firstName: createdUser.firstName || creationForm.firstName,
        lastName: createdUser.lastName || creationForm.lastName,
        email: createdUser.email || creationForm.email,
        phone: createdUser.phone || creationForm.phone,
        automobile: createdUser.automobile || creationForm.automobile,
        electric: createdUser.electric ?? creationForm.electric,
        parked: createdUser.parked ?? false,
      };

      setEmployees((current) => [newEmployee, ...current]);
      setFeedback('Utilisateur créé avec succès.');
      setTimeout(() => closeModal(), 800);
    } catch (error) {
      setFeedback((error as Error).message || 'Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = () => {
    if (!selectedEmployee) {
      return;
    }

    setEmployees((current) =>
      current.map((item) =>
        item.id === selectedEmployee.id
          ? { ...item, ...editForm }
          : item,
      ),
    );

    setFeedback('Modifications enregistrées localement.');
    setTimeout(() => closeModal(), 800);
  };

  return (
    <div className="space-y-6 p-6 bg-slate-50 rounded-3xl shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Liste des employés</h1>
        <p className="text-sm text-slate-600">Chargement via getAllEmployees et composants séparés.</p>
      </div>

      <button
        type="button"
        onClick={openCreateModal}
        className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        + Ajouter un user
      </button>
    </div>

      {isLoading ? (
        <div className="rounded-3xl bg-white p-6 text-sm text-slate-600 shadow-sm">Chargement des employés...</div>
      ) : (
        <EmployeeTable employees={employees} onEdit={openEditModal} />
      )}

      <EmployeeModal
        open={modalOpen}
        mode={modalMode}
        form={modalMode === 'create' ? creationForm : editForm}
        onChange={modalMode === 'create' ? handleCreationChange : handleEditChange}
        onClose={closeModal}
        onSubmit={modalMode === 'create' ? handleCreateUser : handleUpdateUser}
        submitting={submitting}
        feedback={feedback}
      />
    </div>
  );
};

export default SecretaryApp;
