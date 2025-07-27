import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import prisma from "./lib/prisma";
import type { CorsOptions } from "cors";
import userRoutes from "./routes/userRoutes";
import outFlowRoutes from "./routes/outflowRoutes"
import incomeRoutes from "./routes/incomeRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import cryptoRoutes from "./routes/cryptoRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import rewardRoutes from "./routes/rewardRoutes";

const app = express();
const PORT = 3001; //(Vite usa 5173)

console.log("Frontend URL: ", process.env.FRONTEND_URL);

// Configuração com tipagem explícita (opcional)
const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/incomes", incomeRoutes);
app.use("/outflows", outFlowRoutes);
app.use("/investments", investmentRoutes);
app.use("/expenses", expenseRoutes);
app.use("/cryptos", cryptoRoutes);
app.use("/rewards", rewardRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API do Controle Financeiro" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
