import { useIonLoading, useIonRouter, useIonToast } from "@ionic/react";
import { alertOutline } from "ionicons/icons";
import { signOut } from "../services/authService";

export function useSignOut() {
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const [present, dismiss] = useIonLoading();

  const handleSignOut = async () => {
    present();

    try {
      await signOut();

      dismiss();

      router.push("/home", "root", "replace");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao desconectar.";

      dismiss();

      presentToast({
        cssClass: "custom-toast ion-text-center",
        color: "danger",
        position: "top",
        positionAnchor: "header",
        message: message,
        icon: alertOutline,
        duration: 3000,
      });

      console.error(error);
    }
  };

  return { handleSignOut };
}
