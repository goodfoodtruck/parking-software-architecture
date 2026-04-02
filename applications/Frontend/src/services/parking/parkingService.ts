import axiosInstance from '@/lib/axios';
import { IParkingLotData } from '@/store/slices/parkingSlice';
import { AxiosResponse } from 'axios';

interface GetParkingLotsParams {
    startDate?: string
    endDate?: string
}

const ParkingService = {
    getParkingLots(params?: GetParkingLotsParams): Promise<AxiosResponse<IParkingLotData[]>> {
        return axiosInstance.get<IParkingLotData[]>("/parking-lots", {
            params
        })
    }
}

export default ParkingService;
