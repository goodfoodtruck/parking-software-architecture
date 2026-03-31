import { connectRabbitMQ } from "./config/rabbitmq"

export const publishReservationCreated = async (payload: any) => {
    const channel = await connectRabbitMQ()

    const message = Buffer.from(JSON.stringify(payload))

    channel.publish("notifications", "reservation.created", message, {
        persistent: true
    })

    console.log("📤 Event published: reservation.created")
}