import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/userSlice";
import { useEffect } from "react";

const ProfileApp = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-3xl mx-auto border border-slate-200 rounded-xl p-8 text-center text-slate-600">
          Aucun profil n'est connecté. Connectez-vous pour afficher vos informations.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto border border-slate-200 rounded-xl bg-white p-10">
        
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold text-slate-900">Informations Personnelles</h1>
          <p className="text-slate-600 mt-2">Détails de votre compte utilisateur.</p>
        </div>

        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-sky-600 text-3xl font-semibold text-white flex items-center justify-center">
            {userProfile.firstName?.[0] || 'U'}{userProfile.lastName?.[0] || 'P'}
          </div>
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wide">Utilisateur connecté</p>
            <h2 className="text-2xl font-bold text-slate-900">{userProfile.firstName} {userProfile.lastName}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

        <div className="border border-slate-200 rounded-lg p-6 bg-white">
            <p className="text-xs text-slate-500 uppercase">Nom</p>
            <p className="text-base font-medium text-slate-900 mt-1">{userProfile.lastName}</p>
          </div>

        <div className="border border-slate-200 rounded-lg p-6 bg-white">
            <p className="text-xs text-slate-500 uppercase">Prénom</p>
            <p className="text-base font-medium text-slate-900 mt-1">{userProfile.firstName}</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 bg-white md:col-span-2">
            <p className="text-xs text-slate-500 uppercase">Email</p>
            <p className="text-base font-medium text-slate-900 mt-1">{userProfile.email}</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 bg-white md:col-span-2">
            <p className="text-xs text-slate-500 uppercase">Téléphone</p>
            <p className="text-base font-medium text-slate-900 mt-1">{userProfile.phone}</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 bg-white md:col-span-2">
            <p className="text-xs text-slate-500 uppercase">Automobile</p>
            <p className="text-base font-medium text-slate-900 mt-1">{userProfile.automobile}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileApp;