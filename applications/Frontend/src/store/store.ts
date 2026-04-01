import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/slices/userSlice'
import parkingReducer from '@/store/slices/parkingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    parking: parkingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
