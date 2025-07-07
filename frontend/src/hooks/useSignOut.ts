import { useIonLoading, useIonRouter } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { signOut } from "../services/authService";
import { useToast } from "../hooks/useToast";

export function useSignOut() {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const showToast = useToast();

  const handleSignOut = async () => {
    
    try {
      await present();
      await signOut();

      router.push("/home", "root", "replace");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao desconectar.";

      showToast({
        color: "danger",
        message: message,
        icon: closeOutline,
      });

      console.error(error);
    } finally {
      await dismiss();
    }
  };

  return { handleSignOut };
}
