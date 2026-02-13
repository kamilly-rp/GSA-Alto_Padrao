import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import prisma from './config/prisma/prismaConfig.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://gsaimoveis.com.br',
  'https://www.gsaimoveis.com.br',
  'https://gsa-alto-padrao.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Banco conectado com Prisma');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
  }
}

startServer();
