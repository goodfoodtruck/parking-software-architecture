import express from 'express';
import morgan from "morgan"
import logger from './logger';
import { errorMiddleware } from './middlewares/errorMiddleware';

const main = async() => {
    const app = express()
    const PORT = 8000

    app.use(express.json())
    app.use(express.static('src/public'));
    const stream = {
        write: (message: string) => logger.info(message.trim())
    }

    app.use(morgan('combined', { stream }))
    
    app.use(errorMiddleware)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

main()