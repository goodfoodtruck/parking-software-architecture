export type ParkingLot = {
  id: number;
  name: string;
  electric: boolean;
  available: boolean;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  automobile: string;
  electric: boolean;
  parked: boolean;
};

export const mockedUserProfile: UserProfile = {
  firstName: "John",
  lastName: "Doe",
  phone: "123-456-7890",
  email: "doe.john@gmail.com",
  automobile: "Tesla Model 3",
  electric: false,
  parked: false,
};

export const mockedParkingLots: ParkingLot[] = [
  { id: 1, name: "A01", electric: true, available: true },
  { id: 2, name: "A02", electric: true, available: false },
  { id: 3, name: "A03", electric: true, available: true },
  { id: 4, name: "A04", electric: true, available: true },
  { id: 5, name: "A05", electric: true, available: false },
  { id: 6, name: "A06", electric: true, available: true },
  { id: 7, name: "A07", electric: true, available: true },
  { id: 8, name: "A08", electric: true, available: false },
  { id: 9, name: "A09", electric: true, available: true },
  { id: 10, name: "A10", electric: true, available: true },
  { id: 11, name: "B01", electric: false, available: true },
  { id: 12, name: "B02", electric: false, available: false },
  { id: 13, name: "B03", electric: false, available: true },
  { id: 14, name: "B04", electric: false, available: true },
  { id: 15, name: "B05", electric: false, available: false },
  { id: 16, name: "B06", electric: false, available: true },
  { id: 17, name: "B07", electric: false, available: true },
  { id: 18, name: "B08", electric: false, available: true },
  { id: 19, name: "B09", electric: false, available: true },
  { id: 20, name: "B10", electric: false, available: false },
  { id: 21, name: "C01", electric: false, available: true },
  { id: 22, name: "C02", electric: false, available: true },
  { id: 23, name: "C03", electric: false, available: true },
  { id: 24, name: "C04", electric: false, available: false },
  { id: 25, name: "C05", electric: false, available: true },
  { id: 26, name: "C06", electric: false, available: true },
  { id: 27, name: "C07", electric: false, available: true },
  { id: 28, name: "C08", electric: false, available: false },
  { id: 29, name: "C09", electric: false, available: true },
  { id: 30, name: "C10", electric: false, available: true },
  { id: 31, name: "D01", electric: false, available: true },
  { id: 32, name: "D02", electric: false, available: true },
  { id: 33, name: "D03", electric: false, available: true },
  { id: 34, name: "D04", electric: false, available: true },
  { id: 35, name: "D05", electric: false, available: false },
  { id: 36, name: "D06", electric: false, available: true },
  { id: 37, name: "D07", electric: false, available: true },
  { id: 38, name: "D08", electric: false, available: true },
  { id: 39, name: "D09", electric: false, available: true },
  { id: 40, name: "D10", electric: false, available: false },
  { id: 41, name: "E01", electric: false, available: true },
  { id: 42, name: "E02", electric: false, available: true },
  { id: 43, name: "E03", electric: false, available: true },
  { id: 44, name: "E04", electric: false, available: true },
  { id: 45, name: "E05", electric: false, available: true },
  { id: 46, name: "E06", electric: false, available: false },
  { id: 47, name: "E07", electric: false, available: true },
  { id: 48, name: "E08", electric: false, available: true },
  { id: 49, name: "E09", electric: false, available: true },
  { id: 50, name: "E10", electric: false, available: true },
  { id: 51, name: "F01", electric: true, available: true },
  { id: 52, name: "F02", electric: true, available: true },
  { id: 53, name: "F03", electric: true, available: false },
  { id: 54, name: "F04", electric: true, available: true },
  { id: 55, name: "F05", electric: true, available: true },
  { id: 56, name: "F06", electric: true, available: false },
  { id: 57, name: "F07", electric: true, available: true },
  { id: 58, name: "F08", electric: true, available: true },
  { id: 59, name: "F09", electric: true, available: false },
  { id: 60, name: "F10", electric: true, available: true },
];
