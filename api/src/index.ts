import express from 'express';
import morgan from "morgan"
import logger from './logger';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { connectDatabase } from './config/db';

const main = async() => {
    const app = express();
    const PORT = 8000;

    await connectDatabase();

    app.use(express.json());
    app.use(express.static('src/public'));
    const stream = {
        write: (message: string) => logger.info(message.trim())
    }

    app.get("/", (req, res) => res.status(200).send({ message: "Test API." }));

    app.use(morgan('combined', { stream }));
    
    app.use(errorMiddleware);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main()