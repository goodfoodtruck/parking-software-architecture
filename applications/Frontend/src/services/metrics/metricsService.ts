import axiosInstance from '@/lib/axios';
import { IParkingMetrics } from '@/store/slices/metricsSlice';
import { AxiosResponse } from 'axios';

const MetricsService = {
    getMetrics(): Promise<AxiosResponse<IParkingMetrics>> {
        return axiosInstance.get<IParkingMetrics>(`/dashboard`)
    }
}

export default MetricsService
