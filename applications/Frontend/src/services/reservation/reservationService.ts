import axiosInstance from '@/lib/axios';
import { IReservationPlace, IReservationPlaceBody } from '@/store/slices/reservationSlice';
import { AxiosResponse } from 'axios';

const ReservationService = {
  reserveParkingPlace(body: IReservationPlaceBody): Promise<AxiosResponse<IReservationPlace>> {
    return axiosInstance.post<IReservationPlace>(
      `/reservations`,
      body
    );
  },
  getCheckedInByParkingLot(parkingLotId: number): Promise<AxiosResponse<IReservationPlace[]>> {
    return axiosInstance.get<IReservationPlace[]>(`/reservations/parking-lots/${parkingLotId}`);
  }
};

export default ReservationService;
