import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import produtoRoutes from './routes/produtos';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));
app.use(produtoRoutes);

const mongoURI = process.env.MONGODB_URL || '';
console.log('Conectando ao mongo');

mongoURI &&
    mongoose
        .connect(mongoURI)
        .then(() => console.log('MongoDB conectado ...'))
        .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
    console.log('Servidor rodando com sucesso', process.env.PORT)
);
