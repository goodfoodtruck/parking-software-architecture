import { connect, ConsumeMessage } from "amqplib"

export const runConsumer = async (): Promise<void> => {
    const connection = await connect(process.env.RABBITMQ_URL!)
    const channel = await connection.createChannel()

    const handleMessage = (queue: string) => async (message: ConsumeMessage | null): Promise<void> => {
        if (message) {
            console.log(`Received message from ${queue}: ${message.content.toString()}`)
            const parsedMessage = JSON.parse(message.content.toString())

            if (queue === 'reservation-queue') 
                console.log('Handling email notification:', parsedMessage)
            else 
                console.log('Unknown queue:', queue)
            
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