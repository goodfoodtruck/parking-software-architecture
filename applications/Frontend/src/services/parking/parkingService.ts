import { parkingPlacesData } from '@/store/slices/parkingSlice';
import { AxiosResponse } from 'axios';

const ParkingService = {
  getAllParkingPlaces(): Promise<AxiosResponse<parkingPlacesData[]>> {
    // return axiosInstance.get<parkingPlacesData[]>(
    //   `${process.env.NEXT_PUBLIC_BACK_URL}/parking/places`
    // );
    const mockedParkingLots: parkingPlacesData[] = [
      { id: 1, name: "A01", isElectric: true, available: true },
      { id: 2, name: "A02", isElectric: true, available: false },
      { id: 3, name: "A03", isElectric: true, available: true },
      { id: 4, name: "A04", isElectric: true, available: true },
      { id: 5, name: "A05", isElectric: true, available: false },
      { id: 6, name: "A06", isElectric: true, available: true },
      { id: 7, name: "A07", isElectric: true, available: true },
      { id: 8, name: "A08", isElectric: true, available: false },
      { id: 9, name: "A09", isElectric: true, available: true },
      { id: 10, name: "A10", isElectric: true, available: true },
      { id: 11, name: "B01", isElectric: false, available: true },
      { id: 12, name: "B02", isElectric: false, available: false },
      { id: 13, name: "B03", isElectric: false, available: true },
      { id: 14, name: "B04", isElectric: false, available: true },
      { id: 15, name: "B05", isElectric: false, available: false },
      { id: 16, name: "B06", isElectric: false, available: true },
      { id: 17, name: "B07", isElectric: false, available: true },
      { id: 18, name: "B08", isElectric: false, available: true },
      { id: 19, name: "B09", isElectric: false, available: true },
      { id: 20, name: "B10", isElectric: false, available: false },
      { id: 21, name: "C01", isElectric: false, available: true },
      { id: 22, name: "C02", isElectric: false, available: true },
      { id: 23, name: "C03", isElectric: false, available: true },
      { id: 24, name: "C04", isElectric: false, available: false },
      { id: 25, name: "C05", isElectric: false, available: true },
      { id: 26, name: "C06", isElectric: false, available: true },
      { id: 27, name: "C07", isElectric: false, available: true },
      { id: 28, name: "C08", isElectric: false, available: false },
      { id: 29, name: "C09", isElectric: false, available: true },
      { id: 30, name: "C10", isElectric: false, available: true },
      { id: 31, name: "D01", isElectric: false, available: true },
      { id: 32, name: "D02", isElectric: false, available: true },
      { id: 33, name: "D03", isElectric: false, available: true },
      { id: 34, name: "D04", isElectric: false, available: true },
      { id: 35, name: "D05", isElectric: false, available: false },
      { id: 36, name: "D06", isElectric: false, available: true },
      { id: 37, name: "D07", isElectric: false, available: true },
      { id: 38, name: "D08", isElectric: false, available: true },
      { id: 39, name: "D09", isElectric: false, available: true },
      { id: 40, name: "D10", isElectric: false, available: false },
      { id: 41, name: "E01", isElectric: false, available: true },
      { id: 42, name: "E02", isElectric: false, available: true },
      { id: 43, name: "E03", isElectric: false, available: true },
      { id: 44, name: "E04", isElectric: false, available: true },
      { id: 45, name: "E05", isElectric: false, available: true },
      { id: 46, name: "E06", isElectric: false, available: false },
      { id: 47, name: "E07", isElectric: false, available: true },
      { id: 48, name: "E08", isElectric: false, available: true },
      { id: 49, name: "E09", isElectric: false, available: true },
      { id: 50, name: "E10", isElectric: false, available: true },
      { id: 51, name: "F01", isElectric: true, available: true },
      { id: 52, name: "F02", isElectric: true, available: true },
      { id: 53, name: "F03", isElectric: true, available: false },
      { id: 54, name: "F04", isElectric: true, available: true },
      { id: 55, name: "F05", isElectric: true, available: true },
      { id: 56, name: "F06", isElectric: true, available: false },
      { id: 57, name: "F07", isElectric: true, available: true },
      { id: 58, name: "F08", isElectric: true, available: true },
      { id: 59, name: "F09", isElectric: true, available: false },
      { id: 60, name: "F10", isElectric: true, available: true },
    ];

    return Promise.resolve({
      data: mockedParkingLots,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    } as AxiosResponse<parkingPlacesData[]>);
  }
};

export default ParkingService;
