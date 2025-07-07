import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonList,
  IonPage,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { passwordRecovery } from "../../services/authService";
import EmailValidation from "../../components/authentication/EmailValidation";
import { closeOutline, mailOutline } from "ionicons/icons";
import { emailRegex } from "../../utils/emailRegex";
import { useToast } from "../../hooks/useToast";

const PasswordRecovery: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [present, dismiss] = useIonLoading();
  const showToast = useToast();

  const handlePasswordRecovery = async () => {
    setAuthError(undefined);

    try {
      await present();
      await passwordRecovery(email);

      showToast({
        message: "Email de recuperação enviado com sucesso!",
        color: "success",
        icon: mailOutline,
      });

      router.push("/login", "back", "push");
      console.log("Email de recuperação enviado com sucesso!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido.";

      showToast({
        message: errorMessage,
        color: "danger",
        icon: closeOutline,
      });

      setAuthError(errorMessage);
      console.error(error);
    } finally {
      await dismiss();
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <IonCard className="ion-no-margin w-[400px]">
            <IonCardHeader className="ion-text-center">
              <IonCardTitle>
                <h2>Recuperação de senha</h2>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form
                action="recuperar"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordRecovery();
                }}
              >
                <p className="ion-text-center ion-padding-bottom">
                  Informe o email cadastrado para receber um link de recuperação
                  de senha.
                </p>

                <IonList>
                  <EmailValidation
                    value={email}
                    onIonInput={setEmail}
                  ></EmailValidation>

                  <span>
                    <small>{authError}</small>
                  </span>
                </IonList>

                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  type="submit"
                  disabled={!emailRegex.test(email)}
                >
                  Enviar
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordRecovery;
