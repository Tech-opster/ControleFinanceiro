import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import prisma from "../lib/prisma";

// Extend Request interface para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
      firebaseUid?: string;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Pega o token do header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "Token de autenticação necessário",
        message: "Forneça o token no formato: Authorization: Bearer <token>",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    // 2. Verifica o token com Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;

    // 3. Busca o usuário no banco local usando o firebaseUid
    const user = await prisma.users.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    if (!user) {
      res.status(401).json({
        error: "Usuário não encontrado no sistema",
        message: "Token válido, mas usuário não existe no banco de dados",
      });
      return;
    }

    // 4. Adiciona os dados do usuário na requisição
    req.userId = user.id;
    req.firebaseUid = firebaseUid;

    // 5. Continua para o próximo middleware/controller
    next();
  } catch (error: any) {
    console.error("Erro na autenticação:", error);

    // Diferentes tipos de erro do Firebase
    switch (error.code) {
      case "auth/id-token-expired":
        res.status(401).json({
          error: "Token expirado",
          message: "Faça login novamente",
        });
        return;
      case "auth/argument-error":
        res.status(401).json({
          error: "Token inválido",
          message: "Formato do token está incorreto",
        });
        return;
      default:
        // Erro genérico
        res.status(401).json({
          error: "Falha na autenticação",
          message: "Token inválido ou expirado",
        });
        return;
    }
  }
};
