import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonRow>
            <IonCol sizeMd="3" size="12" className="ion-padding ion-blue-bkg">
              <img
                src="https://images.prismic.io/ionicframeworkcom/ac68e1d9-9887-4e5a-9820-9290d06638de_ionic+logo+white+on+blue.png"
                alt="Ionic logo"
              />
            </IonCol>
            <IonCol sizeMd="9" size="12" className="ion-padding">
              <IonCardTitle>Cadastro</IonCardTitle>
              <IonCardContent>
                <form
                  action="cadastrar"
                  onSubmit={(e) => {
                    e.preventDefault();
                    Register();
                  }}
                >
                  <IonInput placeholder="Nome" />
                  <IonInput
                    placeholder="Email"
                    value={email}
                    onIonInput={(e) => setEmail(e.detail.value ?? "")}
                  />
                  <IonInput
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value ?? "")}
                  />
                  <IonButton type="submit">Cadastrar</IonButton>
                </form>
              </IonCardContent>
            </IonCol>
          </IonRow>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
