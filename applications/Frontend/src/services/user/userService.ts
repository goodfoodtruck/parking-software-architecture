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
  },

  getAllEmployees(): Promise<AxiosResponse<UserData[]>> {
    // return axiosInstance.get<UserData[]>(
    //   `${process.env.NEXT_PUBLIC_BACK_URL}/employees`
    // );

    const mockedEmployees: UserData[] = [
      {
        id: 1, firstName: "Marie", lastName: "Durand", email: "marie.durand@example.com", phone: "+33 6 12 34 56 78", automobile: "Renault Clio", electric: false,
        parked: false
      },
      {
        id: 2, firstName: "Paul", lastName: "Martin", email: "paul.martin@example.com", phone: "+33 6 23 45 67 89", automobile: "Tesla Model 3", electric: true,
        parked: false
      },
      {
        id: 3, firstName: "Lucie", lastName: "Moreau", email: "lucie.moreau@example.com", phone: "+33 6 34 56 78 90", automobile: "Peugeot 208", electric: false,
        parked: false
      },
    ];

    return Promise.resolve({
      data: mockedEmployees,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    } as AxiosResponse<UserData[]>);  
  }
};

export default UserService;
