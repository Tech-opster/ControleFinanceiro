import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../generated/prisma'
import type { CorsOptions } from 'cors'; // Importe o tipo se quiser ser explícito


const prisma = new PrismaClient();
const app = express();
const PORT = 3001; //(Vite usa 5173)

console.log("Frontend URL: ", process.env.FRONTEND_URL);


// Configuração com tipagem explícita (opcional)
const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // ← Agora tipado corretamente

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Controle Financeiro' });
});

// Rota para buscar usuários
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Falha ao buscar usuários' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});