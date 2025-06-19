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
} from "@ionic/react";
import { useState } from "react";
import { passwordRecovery } from "../../services/authService";
import EmailValidation from "../../components/authentication/EmailValidation";

const PasswordRecovery: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");

  const handlePasswordRecovery = async () => {
    try {
      await passwordRecovery(email);

      router.push("/login", "back", "replace");
      console.log("Email de recuperação enviado com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar email de recuperação.", err);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <IonCard className="ion-no-margin">
            <IonCardHeader className="ion-text-center">
              <IonCardTitle>
                <h2>Recuperação de senha</h2>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form
                action="cadastrar"
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
                </IonList>

                <IonButton
                  className="ion-margin-top"
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
