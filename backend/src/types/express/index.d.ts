import { UserInterface } from '../IUser';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
  }
}