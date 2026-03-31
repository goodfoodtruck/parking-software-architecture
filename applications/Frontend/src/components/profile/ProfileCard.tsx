const ProfileCard = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-xl font-semibold text-slate-800">Profil utilisateur</h2>
      <div className="mt-4 grid gap-3 text-sm text-slate-700">
        <div className="flex justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span>Nom</span>
          <span>Doe</span>
        </div>
        <div className="flex justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span>Prénom</span>
          <span>John</span>
        </div>
        <div className="flex justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span>Téléphone</span>
          <span>123-456-7890</span>
        </div>
        <div className="flex justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span>Email</span>
          <span>doe.john@gmail.com</span>
        </div>
        <div className="flex justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span>Automobile</span>
          <span>Tesla Model 3</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
