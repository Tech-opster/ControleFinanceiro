import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonList,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { lockClosed } from "ionicons/icons";
import google_icon_dark from "../../assets/images/google_icon_dark.svg";
import { register, loginGoogle } from "../../services/authService";
import EmailValidation from "../../components/authentication/EmailValidation";

const Register: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | undefined>(undefined);

  const handleRegister = async () => {
    try {
      const user = await register(email, password);

      router.push("/", "forward", "replace");
      console.log("Cadastro realizado com sucesso!", user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Erro desconhecido.");
      }
      console.error(error);
    }
  };

  const handleGoogle = async () => {
    try {
      const user = await loginGoogle();

      router.push("/", "forward", "replace");
      console.log("Login Google realizado com sucesso!", user);
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
                <h2>Cadastre-se agora</h2>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form
                action="cadastrar"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                <IonList>
                  <EmailValidation
                    value={email}
                    onIonInput={setEmail}
                  ></EmailValidation>

                  <IonInput
                    label="Senha"
                    labelPlacement="floating"
                    type="password"
                    placeholder="Crie uma senha"
                    value={password}
                    helperText=" "
                    onIonInput={(e) => {
                      setPassword(e.detail.value ?? "");
                    }}
                  >
                    <IonIcon
                      slot="start"
                      icon={lockClosed}
                      aria-hidden="true"
                    ></IonIcon>
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>

                  <span>
                    <small>{authError}</small>
                  </span>
                </IonList>

                <IonButton
                  className="ion-margin-top full-width"
                  type="submit"
                  disabled={!email || !password}
                >
                  Cadastrar
                </IonButton>
              </form>

              <div className="ion-text-center">
                <span>Ou</span>

                <IonButton
                  className="full-width"
                  onClick={() => {
                    handleGoogle();
                  }}
                >
                  <IonIcon slot="start" icon={google_icon_dark}></IonIcon>
                  Continuar com Google
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
