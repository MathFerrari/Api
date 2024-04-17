import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import route from './routes.js';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const port  = process.env.PORT || 3333;
mongoose.connect(process.env.DB_URL)
.then( () => console.log('Connected to MongoDB'))
.catch((error) => console.log(error))

app.use(express.json());
app.use(route);

app.listen(port, () => {
    console.log(`Acessar http://localhost:${port}`);
    console.log("server executando na porta 3333");
});


