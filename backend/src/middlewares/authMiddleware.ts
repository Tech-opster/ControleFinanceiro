import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import {
  getUserByFirebaseUidService,
} from "../services/userService";

// Extend Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: number;
      firebaseUid?: string;
      user?: {
        // Para compatibilidade com seu controller
        uid: string;
        email?: string;
      };
    }
  }
}

// ✅ Middleware original (para rotas que precisam do usuário no banco)
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "Token de autenticação necessário",
        message: "Forneça o token no formato: Authorization: Bearer <token>",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;

    // Busca o usuário no banco local
    const user = await getUserByFirebaseUidService(firebaseUid);

    if (!user) {
      res.status(401).json({
        error: "Usuário não encontrado no sistema",
        message: "Token válido, mas usuário não existe no banco de dados",
      });
      return;
    }

    req.userId = user.id;
    req.firebaseUid = firebaseUid;
    req.user = { uid: firebaseUid, email: decodedToken.email };

    next();
  } catch (error: any) {
    console.error("Erro na autenticação:", error);

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
        res.status(401).json({
          error: "Falha na autenticação",
          message: "Token inválido ou expirado",
        });
        return;
    }
  }
};

// ✅ NOVO: Middleware só para validar token (sem verificar banco)
export const authenticateFirebaseOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "Token de autenticação necessário",
        message: "Forneça o token no formato: Authorization: Bearer <token>",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    // ✅ Só valida o token, NÃO busca no banco
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Adiciona os dados do Firebase na requisição
    req.firebaseUid = decodedToken.uid;
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    console.log("🔵 Token validado - UID:", decodedToken.uid);
    next();
  } catch (error: any) {
    console.error("❌ Erro na validação do token Firebase:", error);

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
        res.status(401).json({
          error: "Falha na autenticação",
          message: "Token inválido ou expirado",
        });
        return;
    }
  }
};
