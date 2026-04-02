import { IParkingLotData } from "@/store/slices/parkingSlice"

const MOCK_DELAY = 500

export const getAvailableParkingLots = async (lots: IParkingLotData[], start: string, end: string): Promise<IParkingLotData[]> => {
    await new Promise((res) => setTimeout(res, MOCK_DELAY))

    return lots.map((lot) => ({
        ...lot,
        available: Math.random() > 0.3
    }))
}