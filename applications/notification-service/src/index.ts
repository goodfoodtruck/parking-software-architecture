import express from 'express';
import morgan from "morgan"
import logger from './logger';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { runConsumer } from './consumer';

const main = async() => {
    const app = express()
    const PORT = 8001

    app.use(express.json())
    const stream = {
        write: (message: string) => logger.info(message.trim())
    }

    app.get("/", (req, res) => res.status(200).send({ message: "Test notification service." }))

    app.use(morgan('combined', { stream }))
    
    app.use(errorMiddleware)

    await runConsumer()
    .then(() => console.log('Consumer is running...'))
    .catch((error) => console.error('Failed to run RabbitMQ consumer', error))
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

main()