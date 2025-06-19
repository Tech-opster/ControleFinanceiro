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

  const handleRegister = async () => {
    try {
      const result = await register(email, password);

      router.push("/", "forward", "replace");
      console.log("Cadastro realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await loginGoogle();

      router.push("/", "forward", "replace");
      console.log("Login Google realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <IonCard className="ion-no-margin">
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
                </IonList>

                <IonButton
                  className="ion-margin-top"
                  type="submit"
                  disabled={!email || !password}
                >
                  Cadastrar
                </IonButton>
              </form>

              <div className="ion-text-center">
                <span>Ou</span>

                <IonButton
                  color="primary"
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
