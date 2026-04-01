import ReservationService from '@/services/reservation/reservationService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IReservationPlaceBody {
    employeeId: string, 
    parkingLotId: string, 
    startDate: Date, 
    endDate: Date
}

export interface IReservationPlace {
    id: string,
    employeeId: string,
    parkingLotId: string,
    startDate: Date,
    endDate: Date,
    checkedIn: boolean
}

interface UserState {
  parkingPlace: IReservationPlace | null,
  status: 'pending' | 'fulfilled' | 'rejected',
  isLoading: boolean
}

const initialState: UserState = {
  parkingPlace: null,
  status: 'fulfilled',
  isLoading: false
}

export const reserveParkingPlace = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (body: IReservationPlaceBody) => {
    const res = await ReservationService.reserveParkingPlace(body);
    return res.data;
  }
)

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetReservation: state => {
      state.parkingPlace = null
      state.status = 'fulfilled'
      state.isLoading = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(reserveParkingPlace.pending, state => {
        state.status = 'pending'
        state.isLoading = true

      })
      .addCase(
        reserveParkingPlace.fulfilled,
        (state, action: PayloadAction<IReservationPlace>) => {
          state.status = 'fulfilled'
          state.parkingPlace = action.payload
          state.isLoading = false
        }
      )
      .addCase(reserveParkingPlace.rejected, (state) => {
        state.status = 'rejected'
        state.isLoading = false,
        state.parkingPlace = null
      })
  },
})

export const { resetReservation } = reservationSlice.actions
export default reservationSlice.reducer
