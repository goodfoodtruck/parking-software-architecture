import { ReservationService } from "../services/Reservation.service";
import cron from 'node-cron';

export class CronScheduler {
    constructor(
        private readonly reservationService: ReservationService
    ) {}

    initJobs() {
        this.cancelAllReservationsEachDay();
    }

    private scheduleCron(schedule: string, job: () => void, label: string) {
        cron.schedule(schedule, () => {
            job();
            console.log(`[CRON] '${label}' executed.`);
        }, { timezone: 'Europe/Paris' });
    }

    private cancelAllReservationsEachDay() {
        this.scheduleCron('0 11 * * *', () => this.reservationService.cancelReservationsAutomatically(), 'cancelAllReservationsEachDay');
    }
}