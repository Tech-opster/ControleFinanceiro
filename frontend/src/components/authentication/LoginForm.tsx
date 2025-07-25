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
  useIonLoading,
} from "@ionic/react";
import "./LoginForm.css";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { closeOutline, lockClosed } from "ionicons/icons";
import google_icon_dark from "../../assets/images/google_icon_dark.svg";
import { loginEmail, loginGoogle } from "../../services/authService";
import EmailValidation from "./EmailValidation";
import { emailRegex } from "../../utils/emailRegex";
import { useToast } from "../../hooks/useToast";

const LoginForm: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [present, dismiss] = useIonLoading();
  const showToast = useToast();

  const handleLoginEmail = async () => {
    setAuthError(undefined);

    try {
      await present();
      const user = await loginEmail(email, password);

      router.push("/home", "root", "replace");
      console.log("Login realizado com sucesso!", user);
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

  const handleGoogle = async () => {
    setAuthError(undefined);

    try {
      await present();
      const user = await loginGoogle();

      router.push("/home", "root", "replace");
      console.log("Login Google realizado com sucesso!", user);
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
    <IonCard className="ion-no-margin w-[400px]">
      <IonCardHeader className="ion-text-center">
        <IonCardTitle>
          <h2>
            Bem-vindo(a) ao <br />
            Controle Financeiro
          </h2>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="!pb-[18px]">
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
            disabled={!emailRegex.test(email) || password.length < 6}
          >
            Entrar
          </IonButton>
        </form>

        <div className="ion-text-center">
          <p className="!my-2">Ou</p>

          <IonButton
            expand="block"
            onClick={() => {
              handleGoogle();
            }}
          >
            <IonIcon className="!mr-3" slot="start" icon={google_icon_dark} />
            <span>Continuar com Google</span>
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
