import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

// Cadastro
export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login com email
export const loginEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Login com Google
export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

// Recuperação de senha
export const passwordRecovery = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};