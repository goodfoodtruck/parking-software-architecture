import fs from "fs"
import path from "path"
import { ReservationConfirmationPayload } from "../services/Notification.service"

export function buildReservationTemplate(payload: ReservationConfirmationPayload) {
    const filePath = path.join(__dirname, "html/create-reservation.html")
    let html = fs.readFileSync(filePath, "utf-8")

    html = html
        .replace("{{lastName}}", payload.lastName)
        .replace("{{firstName}}", payload.firstName)
        .replace("{{startDate}}", payload.startDate)
        .replace("{{endDate}}", payload.endDate)

    return {
        subject: `Confirmation de votre réservation ${payload.firstName} ${payload.lastName}`,
        html
    }
}