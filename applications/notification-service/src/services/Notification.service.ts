import { EmailService } from "../services/Email.service"
import { buildReservationTemplate } from "../templates/createReservation.template"

export interface ReservationConfirmationPayload {
    email: string,
    lastName: string,
    firstName: string,
    startDate: string,
    endDate: string
}

export class NotificationService {
    constructor(private readonly emailService: EmailService) {}

    async sendReservationConfirmation(payload: ReservationConfirmationPayload): Promise<void> {
        const { subject, html } = buildReservationTemplate(payload)
        await this.emailService.send({ to: payload.email, subject, html })
    }
}