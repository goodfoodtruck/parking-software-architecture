import axiosInstance from '@/lib/axios';
import { IReservationPlace, IReservationPlaceBody } from '@/store/slices/reservationSlice';
import { AxiosResponse } from 'axios';

const ReservationService = {
  reserveParkingPlace(body: IReservationPlaceBody): Promise<AxiosResponse<IReservationPlace>> {
    return axiosInstance.post<IReservationPlace>(
      `/reservations`,
      body
    );
  }
};

export default ReservationService;
