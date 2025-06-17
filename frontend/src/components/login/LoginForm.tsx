import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
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
import "./LoginForm.css";

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
    <IonCard className="formContainer ion-padding">
      <IonCardHeader className="ion-text-center">
        <IonCardTitle>
          <h2>Bem-vindo(a) ao Controle Financeiro</h2>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="formContainer">
        <form
          className="formContainer"
          action="cadastrar"
          onSubmit={(e) => {
            e.preventDefault();
            LoginEmail();
          }}
        >
          <IonList>
            <IonItem>
              <IonInput
                labelPlacement="floating"
                value={email}
                onIonInput={(e) => {
                  setEmail(e.detail.value ?? "");
                }}
              >
                <div slot="label">Email</div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                labelPlacement="floating"
                type="password"
                value={password}
                onIonInput={(e) => {
                  setPassword(e.detail.value ?? "");
                }}
              >
                <div slot="label">Senha</div>
              </IonInput>
            </IonItem>
          </IonList>

          <IonButton type="submit" disabled={!email || !password}>
            Entrar
          </IonButton>
        </form>
        <span>OU</span>
        <IonButton
          color="primary"
          onClick={() => {
            loginGoogle();
          }}
        >
          Entrar com uma conta Google
        </IonButton>
        <IonButton
          color="primary"
          onClick={() => router.push("/register", "forward", "push")}
        >
          Não possui conta?
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginForm;
