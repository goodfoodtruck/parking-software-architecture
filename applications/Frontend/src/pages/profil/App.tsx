import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCurrentUser } from '@/store/slices/authSlice'

const ProfilApp = () => {
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <div className="p-4">Chargement du profil...</div>
  }

  if (status === 'failed') {
    return <div className="p-4 text-red-600">Erreur : {error}</div>
  }

  if (!data) {
    return <div className="p-4">Aucun utilisateur connecté pour le moment.</div>
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Profil utilisateur</h1>
      <div className="grid gap-2 text-sm">
        <div>Nom : {data.nom}</div>
        <div>Prénom : {data.prenom}</div>
        <div>Téléphone : {data.telephone}</div>
        <div>Email : {data.email}</div>
        <div>Automobile : {data.automobile}</div>
        <div>Type : {data.electric ? 'Électrique' : 'Non électrique'}</div>
        <div>Status : {data.parked ? 'Garé' : 'Non garé'}</div>
      </div>
    </div>
  )
}

export default ProfilApp