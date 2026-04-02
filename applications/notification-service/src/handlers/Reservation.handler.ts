import { NotificationService } from "../services/Notification.service"

export class ReservationHandler {
    constructor(private readonly notificationService: NotificationService) {}

    async handle(message: Record<string, string>): Promise<void> {
        await this.notificationService.sendReservationConfirmation({
            mailRecipient: message.recipient,
            reservationId: message.reservationId,
            date: message.date,
        })
    }
}