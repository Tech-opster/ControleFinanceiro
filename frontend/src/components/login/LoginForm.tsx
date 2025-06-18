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
} from "@ionic/react";
import { auth } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { lockClosed } from "ionicons/icons";
import "./LoginForm.css";
import google_icon_dark from "../../assets/images/google_icon_dark.svg";

const LoginForm: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginGoogle = async () => {
    const providerGoogle = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, providerGoogle);

      router.push("/", "forward", "replace");
      console.log("Login Google realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

  const LoginEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      router.push("/", "forward", "replace");
      console.log("Login realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

  return (
    <div className="container">
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
          <div className="containerColumn">
            <form
              className="containerColumn"
              action="cadastrar"
              onSubmit={(e) => {
                e.preventDefault();
                LoginEmail();
              }}
            >
              <IonList>
                <IonInput
                  label="Email"
                  labelPlacement="floating"
                  type="email"
                  value={email}
                  onIonInput={(e) => {
                    setEmail(e.detail.value ?? "");
                  }}
                ></IonInput>
                <IonInput
                  label="Senha"
                  labelPlacement="floating"
                  type="password"
                  value={password}
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/register", "forward", "push");
                }}
              >
                Esqueci minha senha
              </a>
              <IonButton type="submit" disabled={!email || !password}>
                Entrar
              </IonButton>
            </form>
            <span>Ou</span>
            <IonButton
              color="primary"
              onClick={() => {
                loginGoogle();
              }}
            >
              <IonIcon slot="start" icon={google_icon_dark}></IonIcon>
              Continuar com Google
            </IonButton>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/register", "forward", "push");
              }}
            >
              Não possui conta?
            </a>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default LoginForm;
