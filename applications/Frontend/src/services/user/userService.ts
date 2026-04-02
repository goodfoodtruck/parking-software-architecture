import axiosInstance from '@/lib/axios';
import { UserCreation } from '@/pages/resources/App';
import { UserData } from '@/store/slices/userSlice';
import { AxiosResponse } from 'axios';

const UserService = {
  getCurretUser(): Promise<AxiosResponse<UserData>> {
    // return axiosInstance.get<UserData>(
    //   `/me`
    // );

    const mockedUserProfile: UserData = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "doe.john@gmail.com",
      automobile: "Tesla Model 3",
      electric: true,
      role: "MANAGER"
    };

    return Promise.resolve({
      data: mockedUserProfile,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    } as AxiosResponse<UserData>);
  },

  getAllEmployees(): Promise<AxiosResponse<UserData[]>> {
    return axiosInstance.get<UserData[]>(
      '/employees'
    );
  },

  checkIn (id: number, reservationId: number): Promise<AxiosResponse<void>> {
    return axiosInstance.post(
      `/employees/${id}/reservations/${reservationId}`
    );
  },

  createEmployee(employeeData: UserCreation): Promise<AxiosResponse<UserData>> {
    return axiosInstance.post<UserData>(
      '/employees/createUser',
      employeeData
    );
  }
};

export default UserService;
