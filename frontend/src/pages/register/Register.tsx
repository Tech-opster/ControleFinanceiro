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
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { lockClosed } from "ionicons/icons";
import google_icon_dark from "../../assets/images/google_icon_dark.svg";

const Register: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Register = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/", "forward", "replace");
      console.log("Cadastro realizado com sucesso!", result.user);
    } catch (err) {
      console.error("Erro ao autenticar.", err);
    }
  };

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
                  Register();
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
                    placeholder="Crie uma senha"
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

                <IonButton type="submit" disabled={!email || !password}>
                  Cadastrar
                </IonButton>
              </form>

              <div className="ion-text-center">
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
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
