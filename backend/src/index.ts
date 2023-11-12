import express, { Express } from 'express';
import { BookRouter } from "./routes/Book";
import cors from 'cors';

export const app: Express = express();
const port = 3000;


app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use('/books', BookRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
