// src/hooks/useToast.ts
import { useIonToast } from "@ionic/react";

export const useToast = () => {
  const [present] = useIonToast();

  const showToast = ({
    message,
    color = "primary",
    icon,
    duration = 3000,
    position = "top",
    positionAnchor = "header",
  }: {
    message: string;
    color?: string;
    icon?: string;
    duration?: number;
    position?: "top" | "middle" | "bottom";
    positionAnchor?: string;
  }) => {
    present({
      cssClass: "custom-toast ion-text-center",
      color,
      position,
      positionAnchor,
      message,
      icon,
      duration,
    });
  };

  return showToast;
};
