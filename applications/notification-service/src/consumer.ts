import { connect, ConsumeMessage } from "amqplib"
import { EmailService } from "./services/Email.service"
import { NotificationService } from "./services/Notification.service"
import { ReservationHandler } from "./handlers/Reservation.handler"

export const runConsumer = async (): Promise<void> => {
    const emailService = new EmailService()
    const notificationService = new NotificationService(emailService)
    const reservationHandler = new ReservationHandler(notificationService)

    const connection = await connect(process.env.RABBITMQ_URL!)
    const channel = await connection.createChannel()

    const handleMessage = (queue: string) => async (message: ConsumeMessage | null): Promise<void> => {
        if (message) {
            console.log(`Received message from ${queue}: ${message.content.toString()}`)
            const parsedMessage = JSON.parse(message.content.toString())

            if (queue === 'reservation-queue') {
                await reservationHandler.handle(parsedMessage)
                console.log('Handling email notification:', parsedMessage)
            }
            else {
                console.log('Unknown queue:', queue)
            }
            
            channel.ack(message)
        }
    }
    
    await channel.assertExchange("notifications", "topic", { durable: true })
    const queue = await channel.assertQueue('reservation-queue', { durable: true })
    await channel.bindQueue(
        queue.queue,
        "notifications",
        "reservation.created"
    )
    await channel.consume('reservation-queue', handleMessage('reservation-queue'))

    console.log('Consumer is subscribed to queues: reservation-queue')
}