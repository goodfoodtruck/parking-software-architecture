import { ParkingLotDTO } from "../dtos/out/ParkingLotDTO";
import { IParkingLotRepository } from "../repositories/IParkingLotRepository";

export class ParkingLotService {
    constructor(
        private readonly parkingLotRepository: IParkingLotRepository
    ) {}

    async getAll(): Promise<ParkingLotDTO[]> {
        const parkingLots: ParkingLotDTO[] = []

        const rows = ["A", "B", "C", "D", "E", "F"];
        const columns = 10;

        rows.forEach((row, rowIndex) => {
            for (let col = 1; col <= columns; col += 1) {
                const number = String(col).padStart(2, '0');
                const id = rowIndex * columns + col;
                const name = `${row}${number}`;
                const isElectric = row === "A" || row === "F";
                const available = col % 3 !== 0;
                parkingLots.push({ id, name, isElectric, available });
            }
        })

        return parkingLots
    }
}