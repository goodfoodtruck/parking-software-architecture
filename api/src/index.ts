import express from 'express';
import morgan from "morgan"
import logger from './logger';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { connectDatabase } from './config/db';
import { publishReservationCreated } from './producer';
import { ReservationController } from './controllers/Reservation.controller';
import { EmployeeController } from './controllers/Employee.controller';
import { ParkingLotController } from './controllers/ParkingLot.controller';

const employeeController = new EmployeeController();
const reservationController = new ReservationController();
const parkingLotController = new ParkingLotController();

const main = async() => {
    const app = express();
    const PORT = 8000;

    await connectDatabase();

    app.use(express.json());
    app.use(express.static('src/public'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    const parkingLots = (() => {
        const rows = ["A", "B", "C", "D", "E", "F"];
        const columns = 10;
        const result: Array<{ id: number; name: string; electric: boolean; available: boolean }> = [];

        rows.forEach((row, rowIndex) => {
            for (let col = 1; col <= columns; col += 1) {
                const number = String(col).padStart(2, '0');
                const id = rowIndex * columns + col;
                const name = `${row}${number}`;
                const electric = row === "A" || row === "F";
                const available = col % 3 !== 0;
                result.push({ id, name, electric, available });
            }
        });

        return result;
    })();

    const stream = {
        write: (message: string) => logger.info(message.trim())
    }

    app.get("/", (req, res) => res.status(200).send({ message: "Test API." }));

    // Parking lots
    app.get("/parking-lots", (req, res) => parkingLotController.getParkingLots(req, res));
    
    // Reservations
    app.post("/reservations", (req, res) => reservationController.createReservation(req, res));
    
    // Employees
    app.get("/employees", (req, res) => employeeController.getEmployees(req, res));

    app.use(morgan('combined', { stream }));
    await publishReservationCreated({ id: "reservation-1", parkingLotId: "1" })
    
    app.use(errorMiddleware);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main()