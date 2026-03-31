import { connect, ConsumeMessage } from "amqplib"

const config = {
  protocol: 'amqp',
  hostname: process.env.RABBITMQ_HOST || 'rabbitmq',
  port: process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT) : 5672,
  username: process.env.RABBITMQ_USER || 'kalo',
  password: process.env.RABBITMQ_PASS || 'kalo',
  vhost: process.env.RABBITMQ_VHOST || '/',
}

export const runConsumer = async (): Promise<void> => {
    const connection = await connect(config)
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

    await channel.assertQueue('reservation-queue', { durable: true })
    await channel.consume('reservation-queue', handleMessage('reservation-queue'))

    console.log('Consumer is subscribed to queues: reservation-queue')
}