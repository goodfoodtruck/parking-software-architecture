import fs from "fs"
import path from "path"
import { ReservationConfirmationPayload } from "../services/Notification.service"

export function buildReservationTemplate(payload: ReservationConfirmationPayload) {
    const filePath = path.join(__dirname, "html/create-reservation.html")
    let html = fs.readFileSync(filePath, "utf-8")

    html = html
        .replace("{{reservationId}}", payload.reservationId)
        .replace("{{date}}", payload.date)

    return {
        subject: `Confirmation de réservation #${payload.reservationId}`,
        html
    }
}