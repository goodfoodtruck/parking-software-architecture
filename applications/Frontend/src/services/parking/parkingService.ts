import axiosInstance from '@/lib/axios';
import { parkingPlacesData } from '@/store/slices/parkingSlice';
import { AxiosResponse } from 'axios';

const ParkingService = {
  getAllParkingPlaces(): Promise<AxiosResponse<parkingPlacesData[]>> {
    return axiosInstance.get<parkingPlacesData[]>(
      `/parking-lots`
    );
  }
};

export default ParkingService;
