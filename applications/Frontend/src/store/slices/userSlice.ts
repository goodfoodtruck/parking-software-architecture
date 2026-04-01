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
  isLoading: boolean,
  employees: UserData[]
}

const initialState: UserState = {
  user: null,
  status: 'fulfilled',
  isLoading: false,
  employees: []
}

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
        const res = await UserService.getCurretUser();
    return res.data;
  }
)

export const getAllEmployees = createAsyncThunk(
  'auth/getAllEmployees',
  async () => {
        const res = await UserService.getAllEmployees();
    return res.data;
  }
)

export const checkIn = createAsyncThunk(
  'auth/checkIn',
  async (args: { id: number; reservationId: number }) => {
    const res = await UserService.checkIn(args.id, args.reservationId);
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
    builder
      .addCase(getAllEmployees.pending, state => {
        state.status = 'pending'
        state.isLoading = true

      })
      .addCase(
        getAllEmployees.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.status = 'fulfilled'
          state.employees = action.payload
          state.isLoading = false
        }
      )
      .addCase(getAllEmployees.rejected, (state) => {
        state.status = 'rejected'
        state.isLoading = false,
        state.employees = []
      })
    builder
      .addCase(checkIn.pending, state => {
        state.status = 'pending'
        state.isLoading = true

      })
      .addCase(
        checkIn.fulfilled,
        (state) => {
          state.status = 'fulfilled'
          if (state.user) {
            state.user.parked = true;
          }
          state.isLoading = false
      })
      .addCase(checkIn.rejected, (state) => {
        state.status = 'rejected'
        state.isLoading = false
        // Optionally, you could set an error message here
      })   
  },
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer
