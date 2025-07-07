import { auth, signOutUser } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { getFirebaseErrorMessage } from "./firebaseErrors";

// Cadastro
export const register = async (email: string, password: string, name: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await updateProfile(user, {
      displayName: name
    });
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error));
  }
};

// Login com email
export const loginEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error));
  }
};

// Login com Google
export const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error));
  }
};

// Recuperação de senha
export const passwordRecovery = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error));
  }
};

export const signOut = async () => {
  try {
    await signOutUser(auth);
    console.log("Desconectado com sucesso!");
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error));
  }
};
