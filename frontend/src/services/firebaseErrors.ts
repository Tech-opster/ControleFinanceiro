import { FirebaseError } from "firebase/app";

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Email inválido.";
      case "auth/user-not-found":
        return "Nenhum usuário encontrado com este email.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/email-already-in-use":
        return "Este email já está cadastrado.";
      case "auth/weak-password":
        return "A senha deve conter pelo menos 6 caracteres.";
      case "auth/too-many-requests":
        return "Muitas tentativas falhas. Tente novamente mais tarde.";
      case "auth/invalid-credential":
        return "Credenciais inválidas.";
      case "auth/unauthorized-domain":
        return "Dispositivo não autorizado.";
      default:
        return "Erro desconhecido. Tente novamente.";
    }
  }

  return "Erro desconhecido. Tente novamente.";
}
