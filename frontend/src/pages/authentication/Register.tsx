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
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { checkmarkOutline, closeOutline, lockClosed } from "ionicons/icons";
import google_icon_dark from "../../assets/images/google_icon_dark.svg";
import { register, loginGoogle } from "../../services/authService";
import EmailValidation from "../../components/authentication/EmailValidation";
import DisplayNameValidation from "../../components/authentication/DisplayNameValidation";
import { emailRegex } from "../../utils/emailRegex";
import { useToast } from "../../hooks/useToast";

const Register: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [present, dismiss] = useIonLoading();
  const showToast = useToast();

  const handleRegister = async () => {
    setAuthError(undefined);

    try {
      await present();
      const user = await register(email, password, name);

      showToast({
        message: "Cadastro realizado com sucesso!",
        color: "success",
        icon: checkmarkOutline,
      });

      router.push("/home", "root", "replace");
      console.log("Cadastro realizado com sucesso!", user);
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
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <IonCard className="ion-no-margin w-[400px]">
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
                  <DisplayNameValidation
                    value={name}
                    onIonInput={setName}
                  ></DisplayNameValidation>

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
                  className="ion-margin-top"
                  expand="block"
                  type="submit"
                  disabled={
                    !emailRegex.test(email) ||
                    password.length < 6 ||
                    name.length < 3
                  }
                >
                  Cadastrar
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
                  <IonIcon
                    className="!mr-3"
                    slot="start"
                    icon={google_icon_dark}
                  />
                  <span>Continuar com Google</span>
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
