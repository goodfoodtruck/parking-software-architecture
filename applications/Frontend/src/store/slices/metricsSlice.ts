import MetricsService from '@/services/metrics/metricsService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IParkingMetrics {
    last30DaysNbReservations: number[]
    nbElectricLots: number
}

interface MetricsState {
    metrics: IParkingMetrics | null
    status: 'pending' | 'fulfilled' | 'rejected'
    isLoading: boolean
}

const initialState: MetricsState = {
    metrics: null,
    status: 'fulfilled',
    isLoading: false
}

export const fetchMetrics = createAsyncThunk(
    'metrics/fetchMetrics',
    async () => {
        const res = await MetricsService.getMetrics()
        return res.data
    }
)

const metricsSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers: {
        resetMetrics: state => {
            state.metrics = null
            state.status = 'fulfilled'
            state.isLoading = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMetrics.pending, state => {
                state.status = 'pending'
                state.isLoading = true
            })
            .addCase(
                fetchMetrics.fulfilled,
                (state, action: PayloadAction<IParkingMetrics>) => {
                    state.status = 'fulfilled'
                    state.metrics = action.payload
                    state.isLoading = false
                }
            )
            .addCase(fetchMetrics.rejected, state => {
                state.status = 'rejected'
                state.isLoading = false
                state.metrics = null
            })
    }
})

export const { resetMetrics } = metricsSlice.actions
export default metricsSlice.reducer