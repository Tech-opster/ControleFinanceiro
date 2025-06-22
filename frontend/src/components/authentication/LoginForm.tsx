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
import EmailValidation from "./EmailValidation";

const LoginForm: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | undefined>(undefined);

  const handleLoginEmail = async () => {
    setAuthError(undefined);

    try {
      const user = await loginEmail(email, password);

      router.push("/", "root", "replace");
      console.log("Login realizado com sucesso!", user);
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

      router.push("/", "root", "replace");
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
    <IonCard className="ion-no-margin width-400">
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
          action="autenticar"
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

            <span>
              <small>{authError}</small>
            </span>
          </IonList>

          <IonRouterLink routerLink="/reset-password">
            Esqueci minha senha
          </IonRouterLink>

          <IonButton
            expand="block"
            type="submit"
            disabled={!email || !password}
          >
            Entrar
          </IonButton>
        </form>

        <div className="ion-text-center">
          <span>Ou</span>

          <IonButton
            expand="block"
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
