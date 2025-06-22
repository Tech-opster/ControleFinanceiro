import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonList,
  IonPage,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { passwordRecovery } from "../../services/authService";
import EmailValidation from "../../components/authentication/EmailValidation";
import { mailOutline } from "ionicons/icons";

const PasswordRecovery: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [present] = useIonToast();

  const handlePasswordRecovery = async () => {
    setAuthError(undefined);
    
    try {
      await passwordRecovery(email);

      present({
        cssClass: "custom-toast ion-text-center",
        color: "success",
        position: "top",
        positionAnchor: "header",
        message: "Email de recuperação enviado com sucesso!",
        icon: mailOutline,
        duration: 3000,
      });

      router.push("/login", "back", "push");
      console.log("Email de recuperação enviado com sucesso!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Erro desconhecido.");
      }
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <IonCard className="ion-no-margin width-400">
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
                  disabled={!email}
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
