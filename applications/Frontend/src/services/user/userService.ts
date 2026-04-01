import { UserData } from '@/store/slices/userSlice';
import { AxiosResponse } from 'axios';

const UserService = {
  getCurretUser(): Promise<AxiosResponse<UserData>> {
    // return axiosInstance.get<UserData>(
    //   `${process.env.NEXT_PUBLIC_BACK_URL}/me`
    // );

    const mockedUserProfile: UserData = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "doe.john@gmail.com",
      automobile: "Tesla Model 3",
      electric: true,
      parked: false,
    };

    return Promise.resolve({
      data: mockedUserProfile,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    } as AxiosResponse<UserData>);
  }
};

export default UserService;
