import ParkingService from '@/services/parking/parkingService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface parkingPlacesData {
  id: number
  name: string
  available: boolean
  isElectric: boolean
}

interface ParkingState {
  parkingPlaces: parkingPlacesData[],
  status: 'pending' | 'fulfilled' | 'rejected',
  isLoading: boolean
}

const initialState: ParkingState = {
  parkingPlaces: [],
  status: 'fulfilled',
  isLoading: false
}

export const fetchParkingPlaces = createAsyncThunk(
  'parking/fetchParkingPlaces',
  async () => {
        const res = await ParkingService.getAllParkingPlaces();
    return res.data;
  }
)

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    resetParking: state => {
      state.parkingPlaces = []
      state.status = 'fulfilled'
      state.isLoading = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchParkingPlaces.pending, state => {
        state.status = 'pending'
        state.isLoading = true

      })
      .addCase(
        fetchParkingPlaces.fulfilled,
        (state, action: PayloadAction<parkingPlacesData[]>) => {
          state.status = 'fulfilled'
          state.parkingPlaces = action.payload
          state.isLoading = false
        }
      )
      .addCase(fetchParkingPlaces.rejected, (state) => {
        state.status = 'rejected'
        state.isLoading = false,
        state.parkingPlaces = []
      })
  },
})

export const { resetParking } = parkingSlice.actions
export default parkingSlice.reducer
