import express from 'express';
import morgan from "morgan"
import logger from './logger';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { connectDatabase } from './config/db';
import { dashboardController, employeeController, parkingLotController, reservationController, cronScheduler } from './init';

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

    const stream = {
        write: (message: string) => logger.info(message.trim())
    }

    app.use("/parking-lots", parkingLotController.getRouter())
    app.use("/employees", employeeController.getRouter())
    app.use("/reservations", reservationController.getRouter())
    app.use("/dashboard", dashboardController.getRouter())

    app.use(morgan('combined', { stream }));

    cronScheduler.initJobs();
    
    app.use(errorMiddleware);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main()