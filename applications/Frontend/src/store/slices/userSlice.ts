import UserService from '@/services/user/userService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  automobile: string;
  electric: boolean;
  parked: boolean;
}

interface UserState {
  user: UserData | null,
  status: 'pending' | 'fulfilled' | 'rejected',
  isLoading: boolean
}

const initialState: UserState = {
  user: null,
  status: 'fulfilled',
  isLoading: false
}

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
        const res = await UserService.getCurretUser();
    return res.data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      state.user = null
      state.status = 'fulfilled'
      state.isLoading = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.status = 'pending'
        state.isLoading = true

      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'fulfilled'
          state.user = action.payload
          state.isLoading = false
        }
      )
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = 'rejected'
        state.isLoading = false,
        state.user = null
      })
  },
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer
