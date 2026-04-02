import { NotificationService } from "../services/Notification.service"

export class ReservationHandler {
    constructor(private readonly notificationService: NotificationService) {}

    async handle(message: Record<string, string>): Promise<void> {
        await this.notificationService.sendReservationConfirmation({
            email: message.email,
            lastName: message.lastName,
            firstName: message.firstName,
            startDate: message.startDate,
            endDate: message.endDate
        })
    }
}