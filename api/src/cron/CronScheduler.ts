import { ReservationService } from "../services/Reservation.service";
import cron from 'node-cron';

export class CronScheduler {
    constructor(
        private readonly reservationService: ReservationService
    ) {}

    initJobs() {
        this.cancelAllReservationsEachDay();
    }

    private cancelAllReservationsEachDay() {
        cron.schedule('0 11 * * *', console.log);
    }
}