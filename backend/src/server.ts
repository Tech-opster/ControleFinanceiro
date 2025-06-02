import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import type { CorsOptions } from 'cors'; // Importe o tipo se quiser ser explícito


const prisma = new PrismaClient();
const app = express();
const PORT = 3001; //(Vite usa 5173)

// Configuração com tipagem explícita (opcional)
const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // ← Agora tipado corretamente

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Controle Financeiro' });
});

// Rota para criar usuário (exemplo)
app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao criar usuário' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});