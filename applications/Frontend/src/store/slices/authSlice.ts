import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  nom: string
  prenom: string
  telephone: string
  email: string
  automobile: string
  electric: boolean
  parked: boolean
}

interface AuthState {
  data: UserData | null
  status: 'success' | 'fulfilled' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  data: null,
  status: 'fulfilled',
  error: null,
}

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
    const response = await fetch('/auth/me', {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Impossible de récupérer le profil utilisateur.')
    }

    return (await response.json()) as UserData
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: state => {
      state.data = null
      state.status = 'success'
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.status = 'fulfilled'
        state.error = null
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'success'
          state.data = action.payload
        }
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Erreur de connexion au serveur'
      })
  },
})

export const { resetAuth } = authSlice.actions
export default authSlice.reducer
