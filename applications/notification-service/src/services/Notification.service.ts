import { EmailService } from "../services/Email.service"
import { buildReservationTemplate } from "../templates/createReservation.template"

export interface ReservationConfirmationPayload {
    mailRecipient: string
    reservationId: string
    date: string
}

export class NotificationService {
    constructor(private readonly emailService: EmailService) {}

    async sendReservationConfirmation(payload: ReservationConfirmationPayload): Promise<void> {
        const { subject, html } = buildReservationTemplate(payload)
        await this.emailService.send({ to: payload.mailRecipient, subject, html })
    }
}