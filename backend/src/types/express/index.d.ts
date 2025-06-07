import { AuthPayload } from '../jwt/jwtPayload';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
  }
}