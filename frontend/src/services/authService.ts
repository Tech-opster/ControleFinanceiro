import { auth, signOutUser } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirebaseErrorMessage } from "./firebaseErrors";
import { post, postPublic } from "./api";

interface RegisterResponse {
  uid: string;
}

interface SyncUserResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    firebaseUid: string;
  };
}

// Cadastro
export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    // ✅ Usa postPublic pois registro é rota pública
    const data = await postPublic<RegisterResponse>("/users/register", {
      email,
      password,
      name,
    });

    // ✅ Após registrar, faz login para obter o token
    const user = await loginEmail(email, password);

    return {
      uid: data.uid,
      user,
    };
  } catch (err) {
    throw new Error(getFirebaseErrorMessage(err));
  }
};

// Login com email
export const loginEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    try {
      await post<SyncUserResponse>("/users/sync-user", {});
      console.log("✅ Usuário sincronizado com o banco");
      return result.user;
    } catch (err) {
      await signOutUser(auth);
      console.error("⚠️ Erro na sincronização:", err);
      throw new Error("Erro ao sincronizar usuário");
    }
  } catch (err) {
    throw new Error(getFirebaseErrorMessage(err));
  }
};

// Login com Google
export const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // ✅ Sincroniza diretamente (usuário já tem token após signInWithPopup)
    try {
      await post<SyncUserResponse>("/users/sync-user", {});
      console.log("✅ Usuário sincronizado com o banco");
      return result.user;
    } catch (err) {
      await signOutUser(auth);
      console.error("⚠️ Erro na sincronização:", err);
      throw new Error("Erro ao sincronizar usuário");
    }
  } catch (err) {
    throw new Error(getFirebaseErrorMessage(err));
  }
};

// Recuperação de senha
export const passwordRecovery = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw new Error(getFirebaseErrorMessage(err));
  }
};

export const signOut = async () => {
  try {
    await signOutUser(auth);
    console.log("Desconectado com sucesso!");
  } catch (err) {
    throw new Error(getFirebaseErrorMessage(err));
  }
};
