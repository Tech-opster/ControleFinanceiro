import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonInput,
  IonRow,
} from "@ionic/react";
import { auth } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";

const Login: React.FC = () => {
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
    <IonContent>
      <IonCard>
        <IonRow>
          <IonCol sizeMd="3" size="12" className="ion-padding ion-blue-bkg">
            <img
              src="https://images.prismic.io/ionicframeworkcom/ac68e1d9-9887-4e5a-9820-9290d06638de_ionic+logo+white+on+blue.png"
              alt="Ionic logo"
              loading="lazy"
            />
          </IonCol>
          <IonCol sizeMd="9" size="12" className="welcome">
            <IonCardHeader>
              <IonCardTitle>
                <h1>Controle Financeiro</h1>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form
                action="cadastrar"
                onSubmit={(e) => {
                  e.preventDefault();
                  LoginEmail();
                }}
              >
                <IonInput
                  placeholder="Email"
                  value={email}
                  onIonInput={(e) => {
                    setEmail(e.detail.value ?? "");
                  }}
                />
                <IonInput
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onIonInput={(e) => {
                    setPassword(e.detail.value ?? "");
                  }}
                />
                <IonButton type="submit" disabled={!email || !password}>
                  Entrar
                </IonButton>
              </form>
              <IonButton
                shape="round"
                color="primary"
                onClick={() => {
                  loginGoogle();
                }}
              >
                Entrar com uma conta Google
              </IonButton>
              <IonButton
                shape="round"
                color="primary"
                onClick={() => router.push("/register", "forward", "replace")}
              >
                Não possui conta?
              </IonButton>
            </IonCardContent>
          </IonCol>
        </IonRow>
      </IonCard>
    </IonContent>
  );
};

export default Login;
