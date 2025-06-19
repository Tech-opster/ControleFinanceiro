import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonList,
  IonRouterLink,
} from "@ionic/react";
import "./LoginForm.css";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { lockClosed } from "ionicons/icons";
import google_icon_dark from "../../assets/images/google_icon_dark.svg";
import { loginEmail, loginGoogle } from "../../services/authService";
import  EmailValidation  from "./EmailValidation";

const LoginForm: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleGoogle = async () => {
    try {
      const result = await loginGoogle();

      router.push("/", "forward", "replace");
      console.log("Login Google realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

  const handleLoginEmail = async () => {
    try {
      const result = await loginEmail(email, password);

      router.push("/", "forward", "replace");
      console.log("Login realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

  return (
    <IonCard className="ion-no-margin">
      <IonCardHeader className="ion-text-center">
        <IonCardTitle>
          <h2>
            Bem-vindo(a) ao <br />
            Controle Financeiro
          </h2>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
          <form
            action="cadastrar"
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginEmail();
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

            <IonRouterLink routerLink="/passwordRecovery">
              Esqueci minha senha
            </IonRouterLink>
            
            <IonButton type="submit" disabled={!email || !password}>
              Entrar
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

            <IonRouterLink routerLink="/register">
              Não possui conta?
            </IonRouterLink>
          </div>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginForm;
