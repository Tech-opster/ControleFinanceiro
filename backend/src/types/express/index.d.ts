// Importe AuthPayload da sua definição
import { AuthPayload } from '../jwtPayload';

// Esta é a forma correta de aumentar a interface Request do Express
// que você importa diretamente do módulo 'express'.
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
  }
}