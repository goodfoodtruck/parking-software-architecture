import amqp, { Channel } from "amqplib"

let channel: Channel

export const connectRabbitMQ = async (): Promise<Channel> => {
    if (channel) 
        return channel

    const connection = await amqp.connect(process.env.RABBITMQ_URL!)
    channel = await connection.createChannel()

    await channel.assertExchange("notifications", "topic", { durable: true })

    console.log("✅ RabbitMQ connected")

    return channel
}