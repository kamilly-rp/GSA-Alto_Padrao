import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  '',
  '',
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

// Rota de ping
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Rotas
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

//  START DO SERVIDOR (ESTAVA FALTANDO)
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});
