import nodemailer, { Transporter } from "nodemailer"

interface MailProps {
    to: string
    subject: string
    html: string
}

export class EmailService {
    private transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? "localhost",
            port: Number(process.env.SMTP_PORT) ?? 1025,
        })
    }

    async send(options: MailProps): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.EMAIL_FROM ?? "noreply@parking.software.architecture",
            ...options,
        })
    }
}