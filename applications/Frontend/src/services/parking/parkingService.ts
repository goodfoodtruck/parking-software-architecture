import axiosInstance from '@/lib/axios';
import { IParkingLotData } from '@/store/slices/parkingSlice';
import { AxiosResponse } from 'axios';

const ParkingService = {
  getAllParkingPlaces(): Promise<AxiosResponse<IParkingLotData[]>> {
    return axiosInstance.get<IParkingLotData[]>(
      `/parking-lots`
    );
  }
};

export default ParkingService;
